import { formatDate, convertToGMT3 } from '../components/agenda/agenda.utils';
import { getServicesConnection } from '../config/database';

export interface AgendaAttributes {
    Referencia: number;
    FechaProc: Date;
    Recepcionista: string;
    NroVehiculo: number;
    Modelo?: string;
    Km: number;
    Combustible: number;
    CodCli: number;
    Cliente?: string;
    Tel1?: string;
    Tel2?: string;
    Email?: string;
    Contacto?: string;
    Cargo: string;
    FPago?: string;
    RemisTaxi: boolean;
    RecepDinamica: boolean;
    CedulaVerde: boolean;
    ManualServ: boolean;
    FechaEnt: Date;
    HoraEnt: number;
    FechaSal: Date;
    HoraSal: number;
    Horas: number;
    ImpGlobalPresu: boolean;
    MObra: number;
    Repuestos: number;
    CodCampProm: number;
    Observaciones?: string;
    ReconfTurno: boolean;
    ConfRepuestos: boolean;
    NroCompIntPr?: number;
    ClienteEspera: boolean;
    ReparRepetida: number;
    Campaña: boolean;
    ACampo: boolean;
    Revision: boolean;
    UltNroCompIntOR?: number;
    ComentariosPreOr?: string;
    CodTipCompPreOr?: string;
    AvisoEvento: boolean;
    EnvioSMS?: number;
    PeritajeFirmado: boolean;
    PeritajeEnviado: boolean;
    FechaRecep?: Date;
    FechaEnvioTerminal?: Date;
    Demorado: boolean;
    Usuario?: string;
    UsuarioM?: string;
    Fecha?: Date;
    FechaM?: Date;
    MovCodTaller?: string;
    MovDia?: Date;
    MovHora?: number;
    MovUsuario?: string;
    MovFecha?: Date;
  }

  export default class Agenda {

    static async findAll(): Promise<AgendaAttributes[]> {
      const servicesConnection = getServicesConnection();
      const result = await servicesConnection.query('SELECT * FROM Agenda');
      return result.map((row: any) => ({
        Referencia: row.Referencia,
        FechaProc: new Date(row.FechaProc),
        Recepcionista: row.Recepcionista,
        NroVehiculo: row.NroVehiculo,
        Modelo: row.Modelo,
        Km: row.Km,
        Combustible: row.Combustible,
        CodCli: row.CodCli,
        Cliente: row.Cliente,
        Tel1: row.Tel1,
        Tel2: row.Tel2,
        Email: row.Email,
        Contacto: row.Contacto,
        Cargo: row.Cargo,
        FPago: row.FPago,
        RemisTaxi: row.RemisTaxi,
        RecepDinamica: row.RecepDinamica,
        CedulaVerde: row.CedulaVerde,
        ManualServ: row.ManualServ,
        FechaEnt: new Date(row.FechaEnt),
        HoraEnt: row.HoraEnt,
        FechaSal: new Date(row.FechaSal),
        HoraSal: row.HoraSal,
        Horas: row.Horas,
        ImpGlobalPresu: row.ImpGlobalPresu,
        MObra: row.MObra,
        Repuestos: row.Repuestos,
        CodCampProm: row.CodCampProm,
        Observaciones: row.Observaciones,
        ReconfTurno: row.ReconfTurno,
        ConfRepuestos: row.ConfRepuestos,
        NroCompIntPr: row.NroCompIntPr,
        ClienteEspera: row.ClienteEspera,
        ReparRepetida: row.ReparRepetida,
        Campaña: row.Campaña,
        ACampo: row.ACampo,
        Revision: row.Revision,
        UltNroCompIntOR: row.UltNroCompIntOR,
        ComentariosPreOr: row.ComentariosPreOr,
        CodTipCompPreOr: row.CodTipCompPreOr,
        AvisoEvento: row.AvisoEvento,
        EnvioSMS: row.EnvioSMS,
        PeritajeFirmado: row.PeritajeFirmado,
        PeritajeEnviado: row.PeritajeEnviado,
        FechaRecep: row.FechaRecep ? new Date(row.FechaRecep) : undefined,
        FechaEnvioTerminal: row.FechaEnvioTerminal ? new Date(row.FechaEnvioTerminal) : undefined,
        Demorado: row.Demorado,
        Usuario: row.Usuario,
        UsuarioM: row.UsuarioM,
        Fecha: row.Fecha ? new Date(row.Fecha) : undefined,
        FechaM: row.FechaM ? new Date(row.FechaM) : undefined,
        MovCodTaller: row.MovCodTaller,
        MovDia: row.MovDia ? new Date(row.MovDia) : undefined,
        MovHora: row.MovHora,
        MovUsuario: row.MovUsuario,
        MovFecha: row.MovFecha ? new Date(row.MovFecha) : undefined,
      }));
    }
    
    static async findByReference(reference: number): Promise<AgendaAttributes | null> {
      const servicesConnection = getServicesConnection();
      const result = await servicesConnection.query(`SELECT * FROM Agenda WHERE Referencia = ${reference}`) as AgendaAttributes[];
      if (result.length === 0) return null;
      const row = result[0];
      return {
        Referencia: row.Referencia,
        FechaProc: new Date(row.FechaProc),
        Recepcionista: row.Recepcionista,
        NroVehiculo: row.NroVehiculo,
        Modelo: row.Modelo,
        Km: row.Km,
        Combustible: row.Combustible,
        CodCli: row.CodCli,
        Cliente: row.Cliente,
        Tel1: row.Tel1,
        Tel2: row.Tel2,
        Email: row.Email,
        Contacto: row.Contacto,
        Cargo: row.Cargo,
        FPago: row.FPago,
        RemisTaxi: row.RemisTaxi,
        RecepDinamica: row.RecepDinamica,
        CedulaVerde: row.CedulaVerde,
        ManualServ: row.ManualServ,
        FechaEnt: new Date(row.FechaEnt),
        HoraEnt: row.HoraEnt,
        FechaSal: new Date(row.FechaSal),
        HoraSal: row.HoraSal,
        Horas: row.Horas,
        ImpGlobalPresu: row.ImpGlobalPresu,
        MObra: row.MObra,
        Repuestos: row.Repuestos,
        CodCampProm: row.CodCampProm,
        Observaciones: row.Observaciones,
        ReconfTurno: row.ReconfTurno,
        ConfRepuestos: row.ConfRepuestos,
        NroCompIntPr: row.NroCompIntPr,
        ClienteEspera: row.ClienteEspera,
        ReparRepetida: row.ReparRepetida,
        Campaña: row.Campaña,
        ACampo: row.ACampo,
        Revision: row.Revision,
        UltNroCompIntOR: row.UltNroCompIntOR,
        ComentariosPreOr: row.ComentariosPreOr,
        CodTipCompPreOr: row.CodTipCompPreOr,
        AvisoEvento: row.AvisoEvento,
        EnvioSMS: row.EnvioSMS,
        PeritajeFirmado: row.PeritajeFirmado,
        PeritajeEnviado: row.PeritajeEnviado,
        FechaRecep: row.FechaRecep ? new Date(row.FechaRecep) : undefined,
        FechaEnvioTerminal: row.FechaEnvioTerminal ? new Date(row.FechaEnvioTerminal) : undefined,
        Demorado: row.Demorado,
        Usuario: row.Usuario,
        UsuarioM: row.UsuarioM,
        Fecha: row.Fecha ? new Date(row.Fecha) : undefined,
        FechaM: row.FechaM ? new Date(row.FechaM) : undefined,
        MovCodTaller: row.MovCodTaller,
        MovDia: row.MovDia ? new Date(row.MovDia) : undefined,
        MovHora: row.MovHora,
        MovUsuario: row.MovUsuario,
        MovFecha: row.MovFecha ? new Date(row.MovFecha) : undefined,
      };
    }
  
    static async create(agenda: AgendaAttributes, user:string): Promise<number> {
        const servicesConnection = getServicesConnection();
        const maxRef = await servicesConnection.query(`
        SELECT ISNULL(MAX(Referencia), 0) + 1 AS NewReferencia FROM Agenda
        `) as any[];
        const newReferencia = maxRef[0].NewReferencia;
        const sql = "INSERT INTO Agenda (Referencia, FechaProc, Recepcionista, NroVehiculo, Modelo, Km, Combustible, CodCli, Cliente, Tel1, Tel2, Email, Contacto, Cargo, FPago, RemisTaxi, RecepDinamica, CedulaVerde, ManualServ, FechaEnt, HoraEnt, FechaSal, HoraSal, Horas, ImpGlobalPresu, MObra, Repuestos, CodCampProm, Observaciones, ReconfTurno, ConfRepuestos, NroCompIntPr, ClienteEspera, ReparRepetida, Campaña, ACampo, Revision, UltNroCompIntOR, ComentariosPreOr, CodTipCompPreOr, AvisoEvento, EnvioSMS, PeritajeFirmado, PeritajeEnviado, FechaRecep, FechaEnvioTerminal, Demorado, Usuario, UsuarioM, Fecha, FechaM, MovCodTaller, MovDia, MovHora, MovUsuario, MovFecha" +
        `) VALUES ('${newReferencia}', '${formatDate(agenda.FechaProc?.toISOString())}', /*recepcionista*/' ', ${agenda.NroVehiculo}, '${agenda.Modelo}', ${agenda.Km}, ${agenda.Combustible}, ${agenda.CodCli}, '${agenda.Cliente}', '${agenda.Tel1}', /*Tel2*/null, '${agenda.Email}', '${agenda.Contacto}', /*Cargo*/' ', '${agenda.FPago}', ${agenda.RemisTaxi ? 1 : 0}, ${agenda.RecepDinamica ? 1 : 0}, ${agenda.CedulaVerde ? 1 : 0}, ${agenda.ManualServ ? 1 : 0}, '${formatDate(agenda.FechaEnt?.toISOString())}', ${agenda.HoraEnt}, '${formatDate(agenda.FechaSal?.toISOString())}', ${agenda.HoraSal}, ${agenda.Horas}, ${agenda.ImpGlobalPresu ? 1 : 0}, ${agenda.MObra}, ${agenda.Repuestos}, ${agenda.CodCampProm}, /*observaciones*/null, ${agenda.ReconfTurno ? 1 : 0}, ${agenda.ConfRepuestos ? 1 : 0}, /*NroCompIntPr*/null, ${agenda.ClienteEspera ? 1 : 0}, ${agenda.ReparRepetida}, ${agenda.Campaña ? 1 : 0}, ${agenda.ACampo ? 1 : 0}, ${agenda.Revision ? 1 : 0}, /*UltNroCompIntOR*/null, /*ComentariosPreOr*/null, /*CodTipCompPreOr*/null, ${agenda.AvisoEvento ? 1 : 0}, ${agenda.EnvioSMS}, ${agenda.PeritajeFirmado ? 1 : 0}, ${agenda.PeritajeEnviado ? 1 : 0}, /*FechaRecep*/null, /*FechaEnvioTerminal*/null, ${agenda.Demorado ? 1 : 0}, '${user}', /*UsuarioM*/null, '${convertToGMT3(agenda.Fecha?.toISOString())}', /*FechaM*/null, /*MovCodTaller*/null, /*MovDia*/null, /*MovHora*/null, /*MovUsuario*/null, /*MovFecha*/null);`;
        await servicesConnection.query(sql);
        return newReferencia;
    }

    
  
    static async update(reference: number, agenda: AgendaAttributes, user: string): Promise<number> {
        const servicesConnection = getServicesConnection();
        const sql = `UPDATE Agenda SET UsuarioM = '${user}', FechaEnt = '${agenda.FechaEnt?.toISOString()}', HoraEnt = '${agenda.HoraEnt}', FechaSal = '${agenda.FechaSal?.toISOString()}', HoraSal = '${agenda.HoraSal}' WHERE Referencia = ${reference}`;
        await servicesConnection.query(sql);
        return reference
    }
  
    static async delete(reference: number): Promise<void> {
      const servicesConnection = getServicesConnection();
      const sql = `DELETE FROM Agenda WHERE Referencia = ${reference}`;
      await servicesConnection.query(sql);
    }
  }
