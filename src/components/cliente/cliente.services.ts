import winston from "winston/lib/winston/config";
import { getGeneralDatabaseConnection, getServicesConnection } from "../../config/database";
import { AgendaAttributes } from "../../models/Agenda";
import { WorkOrder } from "../agenda/agenda.types";
import { convertToGMT3 } from "../agenda/agenda.utils";
import logger from "../../logger";

const findClient = async(filterValue:string):Promise<IClient|null> => {
  const generalConnection = getGeneralDatabaseConnection();
  let query = `SELECT CodCli FROM Clientes WHERE ` + 
  `TRIM(NroDoc) = '${filterValue}' ` +
  `OR TRIM(NroDoc) LIKE CONCAT('%-', '${filterValue}', '-%') ` +
  `OR TRIM(NroDoc) LIKE CONCAT('${filterValue}', '-%') ` +
  `OR TRIM(NroDoc) LIKE CONCAT('%-', '${filterValue}') ` +
  `AND FechaBaja IS NULL`;
  
  const result = await generalConnection.query(query) as IClient[];
  if (result.length === 0){
    return null
  }
  
  const row = result[0];
  return {
    CodCli: row.CodCli
  }
}

interface IClient {
  CodCli: number, 
}


export const findOrCreateClient = async (params: WorkOrder, usuario:string):Promise<number> => {
  try {
    let CodCli = 0;
    let ClientData = null;
    if(params.AccountNumeroDeDocumento){
        ClientData = await findClient(params.AccountNumeroDeDocumento);
        if(ClientData){
            CodCli = ClientData.CodCli
        }
    }
    if(!CodCli && params.Account?.CUILCUIT){
        ClientData = await findClient(params.Account.CUILCUIT);
        if(ClientData){
            CodCli = ClientData.CodCli
        }
    }

    if(!CodCli){
        //crear
        const generalConnection = getGeneralDatabaseConnection();
        const maxRef = await generalConnection.query(`SELECT ISNULL(MAX(CodCli), 0) + 1 AS NewCodCli FROM Clientes`) as any[];
        const NewCodCli = maxRef[0].NewCodCli;
        let sql = ``;
        if(params.Account?.RecordType?.Name == 'Persona'){
            sql = 
                `INSERT INTO [dbo].[Clientes] ` +
                `([CodCli], [RazSoc], [Direccion], [Barrio], [Localidad], [CodPos], [CodPro], ` +
                `[CodPais], [Tel1], [Tel2], [Fax], [EMail], [PagWeb], [CodEst], [Sexo], [FecNacim], ` +
                `[CodAgruCli], [FecAgruCli], [ObservaCli], [CodCondIVA], [CodDoc], [NroDoc], ` +
                `[Reventa], [LimiteCredito], [DiasCredito], [CodCliTerminal], [SujetoVinc], ` +
                `[CodAdm], [CodMedCont], [NoInformarUif], [FechaBaja], [Usuario], [UsuarioM], ` +
                `[Fecha], [FechaM]) ` +
                `VALUES ( ` +
                    `${NewCodCli}, ` + // CodCli
                    `UPPER('${params.AccountLastName} & ${params.AccountFirstName}'), ` + // RazSoc
                    `'${params.Account.BillingStreet}', ` + // Direccion
                    `NULL, ` + // Barrio
                    `'${params.Account.BillingCity}', ` + // Localidad
                    `${Number(params?.Account?.BillingPostalCode)}, ` + // CodPos
                    `(SELECT TOP 1 CodPro FROM [dbo].[CodPos] WHERE CodPos = '${params.Account.BillingPostalCode}'), ` + // CodPro
                    `NULL, ` + // CodPais
                    `'${params.AccountPersonMobilePhone}', ` + // Tel1
                    `NULL, ` + // Tel2
                    `NULL, ` + // Fax
                    `COALESCE('${params.AccountPersonEmail}', 'noposee@noposee.com'), ` + // EMail
                    `NULL, ` + // PagWeb
                    `'ND', ` + // CodEst
                    `'${params.Account.Sexo == 'Femenino' ? 'F' : 'M' }', ` + // Sexo
                    `NULL, ` + // FecNacim
                    `NULL, ` + // CodAgruCli
                    `NULL, ` + // FecAgruCli
                    `NULL, ` + // ObservaCli
                    `CASE WHEN '${params.Account.CUILCUIT}' IS NOT NULL THEN 'RI' ELSE 'CF' END, ` + // CodCondIVA
                    `CASE WHEN '${params.AccountTipoDeDocumento}' = 'DNI' THEN 96 WHEN '${params.AccountTipoDeDocumento}' = 'CUIT' THEN 80 ELSE 86 END, ` + // CodDoc
                    `'${params.AccountNumeroDeDocumento}', ` + // NroDoc
                    `0, ` + // Reventa
                    `0.0, ` + // LimiteCredito
                    `0, ` + // DiasCredito
                    `NULL, ` + // CodCliTerminal
                    `0, ` + // SujetoVinc
                    `NULL, ` + // CodAdm
                    `NULL, ` + // CodMedCont
                    `0, ` + // NoInformarUif
                    `NULL, ` + // FechaBaja
                    `'${usuario}', ` + // Usuario
                    `NULL, ` + // UsuarioM
                    `GETDATE(), ` + // Fecha
                    `NULL ` + // FechaM
                `);`;
        } else {
            sql = `` +
            `INSERT INTO [dbo].[Clientes] ` +
            `([CodCli], [RazSoc], [Direccion], [Barrio], [Localidad], [CodPos], [CodPro], ` +
            `[CodPais], [Tel1], [Tel2], [Fax], [EMail], [PagWeb], [CodEst], [Sexo], [FecNacim], ` +
            `[CodAgruCli], [FecAgruCli], [ObservaCli], [CodCondIVA], [CodDoc], [NroDoc], ` +
            `[Reventa], [LimiteCredito], [DiasCredito], [CodCliTerminal], [SujetoVinc], ` +
            `[CodAdm], [CodMedCont], [NoInformarUif], [FechaBaja], [Usuario], [UsuarioM], ` +
            `[Fecha], [FechaM]) ` +
            `VALUES ( ` +
                `${NewCodCli}, ` + // CodCli
                `UPPER('${params?.Account?.Name ?? ''}'), ` + // RazSoc
                `'${params?.Account?.BillingStreet ?? ''}', ` + // Direccion
                `NULL, ` + // Barrio
                `'${params?.Account?.BillingCity ?? ''}', ` + // Localidad
                `${Number(params?.Account?.BillingPostalCode)}, ` + // CodPos
                `(SELECT TOP 1 CodPro FROM [dbo].[CodPos] WHERE CodPos = '${params?.Account?.BillingPostalCode ?? ''}'), ` + // CodPro
                `NULL, ` + // CodPais
                `'${params?.Account?.Phone ?? ''}', ` + // Tel1
                `NULL, ` + // Tel2
                `NULL, ` + // Fax
                `COALESCE('${params?.Account?.EmailNewcon ?? ''}', 'noposee@noposee.com'), ` + // EMail
                `NULL, ` + // PagWeb
                `'ND', ` + // CodEst
                `NULL, ` + // Sexo
                `NULL, ` + // FecNacim
                `NULL, ` + // CodAgruCli
                `NULL, ` + // FecAgruCli
                `NULL, ` + // ObservaCli
                `CASE WHEN '${params?.Account?.CUILCUIT ?? ''}' IS NOT NULL THEN 'RI' ELSE 'CF' END, ` + // CodCondIVA
                `CASE WHEN '${params.AccountTipoDeDocumento}' = 'DNI' THEN 96 WHEN '${params.AccountTipoDeDocumento}' = 'CUIT' THEN 80 ELSE 86 END, ` + // CodDoc
                `'${params.AccountNumeroDeDocumento}', ` + // NroDoc
                `0, ` + // Reventa
                `0.0, ` + // LimiteCredito
                `0, ` + // DiasCredito
                `NULL, ` + // CodCliTerminal
                `0, ` + // SujetoVinc
                `NULL, ` + // CodAdm
                `NULL, ` + // CodMedCont
                `0, ` + // NoInformarUif
                `NULL, ` + // FechaBaja
                `'${usuario}', ` + // Usuario
                `NULL, ` + // UsuarioM
                `GETDATE(), ` + // Fecha
                `NULL ` + // FechaM
            `);`;
        }
        await generalConnection.query(sql);
        CodCli = NewCodCli
    }
    return CodCli;
  } catch (error:any) {
    const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));
    logger.error('An error occurred:'
    );
    logger.error(errorDetails)
    throw new Error(error.message);
  }
}