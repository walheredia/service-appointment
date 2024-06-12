import { AgendaAttributes } from "../../models/Agenda";
import { ReclamosAttributes } from "../../models/AgendaReclamos";

interface MappedData {
    [key: string]: any;
  }
  
export const mapToAgendaAttributes = (mappedData: MappedData): AgendaAttributes => {
    return {
        Referencia: 123123213, // Assuming this will be auto-incremented by the database
        FechaProc: new Date(), // Default value
        Recepcionista: '', // Default value or extract from mappedData if available
        NroVehiculo: 0, // Default value or extract from mappedData if available
        Modelo: mappedData["Servicios.dbo.Agenda.Modelo"] || '', // Provide default if not present
        Km: parseInt(mappedData["Servicios.dbo.Agenda.Km"] || '0'),
        Combustible: 0, // Default value or extract from mappedData if available
        CodCli: 0, // Default value or extract from mappedData if available
        Cliente: mappedData["Servicios.dbo.Agenda.Cliente"] || '',
        Tel1: mappedData["Servicios.dbo.Agenda.Tel1"] || '',
        Tel2: '', // Default value or extract from mappedData if available
        Email: mappedData["Servicios.dbo.Agenda.Email"] || '',
        Contacto: mappedData["Servicios.dbo.Agenda.Contacto"] || '',
        Cargo: '', // Default value or extract from mappedData if available
        FPago: '', // Default value or extract from mappedData if available
        RemisTaxi: false, // Default value or extract from mappedData if available
        RecepDinamica: false, // Default value or extract from mappedData if available
        CedulaVerde: false, // Default value or extract from mappedData if available
        ManualServ: false, // Default value or extract from mappedData if available
        FechaEnt: new Date(mappedData["Servicios.dbo.Agenda.FechaEnt"] || Date.now()),
        HoraEnt: parseFloat(mappedData["Servicios.dbo.Agenda.HoraEnt"] || '0'),
        FechaSal: new Date(mappedData["Servicios.dbo.Agenda.FechaSal"] || Date.now()),
        HoraSal: parseFloat(mappedData["Servicios.dbo.Agenda.HoraSal"] || '0'),
        Horas: 0, // Default value or extract from mappedData if available
        ImpGlobalPresu: false, // Default value or extract from mappedData if available
        MObra: 0, // Default value or extract from mappedData if available
        Repuestos: 0, // Default value or extract from mappedData if available
        CodCampProm: 0, // Default value or extract from mappedData if available
        Observaciones: '', // Default value or extract from mappedData if available
        ReconfTurno: false, // Default value or extract from mappedData if available
        ConfRepuestos: false, // Default value or extract from mappedData if available
        NroCompIntPr: 0, // Default value or extract from mappedData if available
        ClienteEspera: mappedData["Servicios.dbo.Agenda.ClienteEspera"] || false,
        ReparRepetida: 0, // Default value or extract from mappedData if available
        Campaña: false, // Default value or extract from mappedData if available
        ACampo: false, // Default value or extract from mappedData if available
        Revision: false, // Default value or extract from mappedData if available
        UltNroCompIntOR: 0, // Default value or extract from mappedData if available
        ComentariosPreOr: '', // Default value or extract from mappedData if available
        CodTipCompPreOr: '', // Default value or extract from mappedData if available
        AvisoEvento: false, // Default value or extract from mappedData if available
        EnvioSMS: 0, // Default value or extract from mappedData if available
        PeritajeFirmado: false, // Default value or extract from mappedData if available
        PeritajeEnviado: false, // Default value or extract from mappedData if available
        FechaRecep: new Date(), // Default value or extract from mappedData if available
        FechaEnvioTerminal: new Date(), // Default value or extract from mappedData if available
        Demorado: false, // Default value or extract from mappedData if available
        Usuario: '', // Default value or extract from mappedData if available
        UsuarioM: '', // Default value or extract from mappedData if available
        Fecha: new Date(), // Default value or extract from mappedData if available
        FechaM: new Date(), // Default value or extract from mappedData if available
        MovCodTaller: '', // Default value or extract from mappedData if available
        MovDia: new Date(), // Default value or extract from mappedData if available
        MovHora: 0, // Default value or extract from mappedData if available
        MovUsuario: '', // Default value or extract from mappedData if available
        MovFecha: new Date(), // Default value or extract from mappedData if available
    };
};


export const mapToReclamosAttributes = (mappedData: MappedData): ReclamosAttributes => {
    return {
        Referencia: parseInt(mappedData["Servicios.dbo.AgendaReclamos.Referencia"]),
        Item: parseInt(mappedData["Servicios.dbo.AgendaReclamos.Item"]),
        Reclamo: mappedData["Servicios.dbo.AgendaReclamos.Reclamo"] || '',
        Origen: mappedData["Servicios.dbo.AgendaReclamos.Origen"] || '',
        Tipo: parseInt(mappedData["Servicios.dbo.AgendaReclamos.Tipo"] || '0'),
        Categoria: parseInt(mappedData["Servicios.dbo.AgendaReclamos.Categoria"] || '0'),
        ComTecnico: mappedData["Servicios.dbo.AgendaReclamos.ComTecnico"] || '',
        CausaRaiz: mappedData["Servicios.dbo.AgendaReclamos.CausaRaiz"] || '',
        InstTrabajo: mappedData["Servicios.dbo.AgendaReclamos.InstTrabajo"] || '',
        CtrlCalidad: mappedData["Servicios.dbo.AgendaReclamos.CtrlCalidad"] === '1',
        CodOperario: mappedData["Servicios.dbo.AgendaReclamos.CodOperario"] || '',
        ComCalidad: mappedData["Servicios.dbo.AgendaReclamos.ComCalidad"] || '',
        Que: mappedData["Servicios.dbo.AgendaReclamos.Que"] || '',
        Cuando: mappedData["Servicios.dbo.AgendaReclamos.Cuando"] || '',
        Frecuencia: mappedData["Servicios.dbo.AgendaReclamos.Frecuencia"] || '',
        Condiciones: mappedData["Servicios.dbo.AgendaReclamos.Condiciones"] || '',
        TipoDeCamino: mappedData["Servicios.dbo.AgendaReclamos.TipoDeCamino"] || '',
        ParteAuto: mappedData["Servicios.dbo.AgendaReclamos.ParteAuto"] || '',
        ConfirmaCli: mappedData["Servicios.dbo.AgendaReclamos.ConfirmaCli"] == 'true',
        ConfirmaAsesor: mappedData["Servicios.dbo.AgendaReclamos.ConfirmaAsesor"] === '1',
        ConfirmaTiempo: mappedData["Servicios.dbo.AgendaReclamos.ConfirmaTiempo"] === '1',
        DescribirSintoma: mappedData["Servicios.dbo.AgendaReclamos.DescribirSintoma"] || '',
        TpoEstimado: parseFloat(mappedData["Servicios.dbo.AgendaReclamos.TpoEstimado"] || '0'),
        CorrespondeTD: mappedData["Servicios.dbo.AgendaReclamos.CorrespondeTD"] || '',
        RutaTD: mappedData["Servicios.dbo.AgendaReclamos.RutaTD"] || '',
        PruebaEstatica: mappedData["Servicios.dbo.AgendaReclamos.PruebaEstatica"] || '',
        Box: mappedData["Servicios.dbo.AgendaReclamos.Box"] || '',
        InfoAdicional: mappedData["Servicios.dbo.AgendaReclamos.InfoAdicional"] || '',
        TipoUsoUnidad: mappedData["Servicios.dbo.AgendaReclamos.TipoUsoUnidad"] || '',
    };
};
