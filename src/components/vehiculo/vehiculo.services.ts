import { error } from "console";
import { getGeneralDatabaseConnection, getServicesConnection } from "../../config/database";
import { WorkOrder } from "../agenda/agenda.types";
import { convertToGMT3 } from "../agenda/agenda.utils";

export const findVehicle = async(filterType:string, filterValue:string):Promise<IVehicle|null> => {
  const servicesConnection = getServicesConnection();
  const query = `SELECT NroVehiculo, CodTitular from Servicios.dbo.Vehiculos where ${filterType} = '${filterValue}'`;
  const result = await servicesConnection.query(query) as IVehicle[];
  if (result.length === 0){
    return null
  }
  
  const row = result[0];
  return {
    NroVehiculo: row.NroVehiculo,
    CodTitular: row.CodTitular
  }
}

interface IVehicle {
  NroVehiculo: number, 
  CodTitular: number, 
}

const findColor = async():Promise<string> => {
  const generalConnection = getGeneralDatabaseConnection();
  const query = `SELECT CodCol from General.dbo.Colores where NoDef = 1`
  const result = await generalConnection.query(query) as ICol[];
  if (result.length === 0){
    return ' '
  }
  
  const row = result[0];
  return row.CodCol ?? ' ';
}

interface ICol {
  CodCol: string | null, 
}

const findModelo = async(model?:string):Promise<IMod> => {
  const empty = {
    DesMod: null,
    CodMar: '01'
  }
  if(!model) {
    return empty
  }
  const generalConnection = getGeneralDatabaseConnection();
  const query = `SELECT DesMod, CodMar from General.dbo.Modelos where CodAlt = '${model}' or CodAlt2 = '${model}'`
  const result = await generalConnection.query(query) as IMod[];
  if (result.length === 0){
    return empty
  }
  
  const row = result[0];
  return {
    DesMod: row.DesMod,
    CodMar: row.CodMar
  }
}

interface IMod {
  DesMod: string | null,
  CodMar: string | null  
}

export const createVehicle = async (params: WorkOrder, codTitular: number, usuario:string):Promise<number> => {
  try {
    const servicesConnection = getServicesConnection();
    const modelo = await findModelo(params.Modelo);
    const color = await findColor();
    const maxRef = await servicesConnection.query(`SELECT ISNULL(MAX(NroVehiculo), 0) + 1 AS NewNroVehiculo FROM Vehiculos`) as any[];
    const NewNroVehiculo = maxRef[0].NewNroVehiculo;
    const sqlCreate = `INSERT INTO [dbo].[Vehiculos] ([NroVehiculo],[CodMar],[Patente],[FecPatente],[NroChasis],[NroSerie],[NroMotor],[Año],[NroOPR],[CodModelo],[Modelo],[CodAgru],[CodMotor],[CodTipVehic],[CodAccVehic],[CodCol],[FechaEntrega],[CodConce],[CodTitular],[Conductor],[Contacto],[Observaciones],[ConsideraPresup],[Generico],[ContactarAPartir],[UltServKilometraje],[FecUltServ],[NroCompIntORUltServ],[UltEncuestaCSAT],[UltEncuestaNPS],[KmsXDia],[UsuarioAut],[FechaAutRetiro],[FechaSalida],[EnTaller],[CodMod],[Usuario],[UsuarioM],[Fecha],[FechaM])`+
     `VALUES (`+
        `${NewNroVehiculo}` +
        `,${modelo.CodMar ? `'${modelo.CodMar}'` : null}` +//<CodMar, char(6),>              GRABANDO-CODMAR
        `,'${params.Patente}'` +
        `,null` + //,<FecPatente, datetime,>
        `,'${params.VIN}'` + //NroChasis
        `,' '` + //<NroSerie, char(10),>
        `,' '` + //<NroMotor, char(30),>
        `,null` + //<Año, smallint,>
        `,null` + //<NroOPR, char(20),>
        `,null` + //<CodModelo, char(15),>
        `,${modelo.DesMod ? `'${modelo.DesMod}'` : null}` + //<Modelo, varchar(250),>      GRABANDO-MODELO
        `,${modelo.CodMar ? `'${modelo.CodMar}'` : null}` + //<CodAgru, char(6),>          GRABANDO-CODAGRU
        `,null` + //<CodMotor, char(6),>
        `,null` + //<CodTipVehic, char(6),>
        `,null` + //<CodAccVehic, char(6),>
        `,'${color}'` + //<CodCol, char(6),>              GRABANDO-CODCOL
        `,null` + //<FechaEntrega, datetime,>
        `,null` + //<CodConce, char(10),>
        `,${codTitular}` + //<CodTitular, int,>              GRABAR-CODTITULAR
        `,null` + //<Conductor, varchar(100),>
        `,null` + //<Contacto, varchar(100),>
        `,null` + //<Observaciones, varchar(200),>
        `,0` + //<ConsideraPresup, bit,>
        `,0` + //<Generico, bit,>
        `,null` + //<ContactarAPartir, datetime,>
        `,0` + //<UltServKilometraje, int,>
        `,null` + //<FecUltServ, datetime,>
        `,0` + //<NroCompIntORUltServ, int,>
        `,null` + //<UltEncuestaCSAT, varchar(2),>
        `,null` + //<UltEncuestaNPS, varchar(2),>
        `,0` + //<KmsXDia, int,>
        `,null` + //<UsuarioAut, varchar(50),>
        `,null` + //<FechaAutRetiro, datetime,>
        `,null` + //<FechaSalida, datetime,>
        `,0` + //<EnTaller, bit,>
        `,null` + //<CodMod, char(15),>
        `,'${usuario}'`+
        `,null` + //<UsuarioM, char(50),>
        `,'${convertToGMT3(new Date().toISOString())}'`+
        `,null` + //<FechaM, datetime,>)`
        ');';
    await servicesConnection.query(sqlCreate);
    return NewNroVehiculo;
  } catch (error) {
    console.log(error)
    const err = error as Error;
    throw new Error(err.message);
  }
}