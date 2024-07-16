import { AgendaAttributes } from "../../models/Agenda";
import { ReclamosAttributes } from "../../models/AgendaReclamos";
import { Account, Requerimiento, WorkOrder } from "./agenda.types";

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
        Origen: parseOrigen(mappedData["Servicios.dbo.AgendaReclamos.Origen"]),
        Tipo: mappedData["Servicios.dbo.AgendaReclamos.Tipo"] || '0',
        Categoria: mappedData["Servicios.dbo.AgendaReclamos.Categoria"],
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
        TpoEstimado: mappedData["Servicios.dbo.AgendaReclamos.TpoEstimado"] || '0',
        CorrespondeTD: mappedData["Servicios.dbo.AgendaReclamos.CorrespondeTD"] || '',
        RutaTD: mappedData["Servicios.dbo.AgendaReclamos.RutaTD"] || '',
        PruebaEstatica: mappedData["Servicios.dbo.AgendaReclamos.PruebaEstatica"] || '',
        Box: mappedData["Servicios.dbo.AgendaReclamos.Box"] || '',
        InfoAdicional: mappedData["Servicios.dbo.AgendaReclamos.InfoAdicional"] || '',
        TipoUsoUnidad: mappedData["Servicios.dbo.AgendaReclamos.TipoUsoUnidad"] || '',
    };
};

const fieldMapping: { [key: string]: string } = {
    "AccountPersonMobilePhone": "Servicios.dbo.Agenda.Tel1",
    "AccountPersonEmail": "Servicios.dbo.Agenda.Email",
    "Modelo": "Servicios.dbo.Agenda.Modelo",
    "Kilometraje": "Servicios.dbo.Agenda.Km",
};

const fieldMappingReclamos: { [key: string]: string } = {
    "Sintoma": "Servicios.dbo.AgendaReclamos.Reclamo",
    "Tiempo": "Servicios.dbo.AgendaReclamos.TpoEstimado",
    "PruebaEstatica": "Servicios.dbo.AgendaReclamos.PruebaEstatica",
    "InformacionAdicional": "Servicios.dbo.AgendaReclamos.InfoAdicional",
    "UsoUnidad": "Servicios.dbo.AgendaReclamos.TipoUsoUnidad",
    "Que": "Servicios.dbo.AgendaReclamos.Que",
    "Cuando": "Servicios.dbo.AgendaReclamos.Cuando",
    "Frecuencia": "Servicios.dbo.AgendaReclamos.Frecuencia",
    "Condiciones": "Servicios.dbo.AgendaReclamos.Condiciones",
    "TipoCamino": "Servicios.dbo.AgendaReclamos.TipoDeCamino",
    "LugarAuto": "Servicios.dbo.AgendaReclamos.ParteAuto",
    "ConfirmadaCliente": "Servicios.dbo.AgendaReclamos.ConfirmaCli",
    "Origen": "Servicios.dbo.AgendaReclamos.Origen",
    "Tipo": "Servicios.dbo.AgendaReclamos.Tipo"
};

function parseOrigen(origen?:string){
    if(origen == 'Cliente'){
        return 'C'
    }
    if(origen == 'Concesionario'){
        return 'I'
    }
    return ' '
}

export function mapJsonToDatabase(json:any): { [key: string]: any } {
    const mappedObject: { [key: string]: any } = {};

    // Mapea los campos del WorkOrder
    const workOrder = json.WorkOrder;

    const firstName = workOrder.AccountFirstName || '';
    const lastName = workOrder.AccountLastName || '';
    mappedObject['Servicios.dbo.Agenda.Cliente'] = `${firstName} ${lastName}`.trim();

    if(workOrder.EsperaElVehiculo == 'Si'/* || workOrder.ClienteSinCitaPrevia == 'true'*/){
        mappedObject['Servicios.dbo.Agenda.ClienteEspera  '] = true;
    } else {
        mappedObject['Servicios.dbo.Agenda.ClienteEspera  '] = false; 
    }

    const NombreContacto = workOrder.NombreContacto || '';
    const ApellidoContacto = workOrder.ApellidoContacto || '';
    const EmailContacto = workOrder.EmailContacto || '';
    const CelularContacto = workOrder.CelularContacto || '';
    mappedObject['Servicios.dbo.Agenda.Contacto'] = `${NombreContacto} ${ApellidoContacto} ${EmailContacto} ${CelularContacto}`.trim();

    for (const key in workOrder) {
        if (fieldMapping[key]) {
            mappedObject[fieldMapping[key]] = workOrder[key as keyof WorkOrder];
        }
    }

    // Mapea los campos dentro de Account si existen
    if (workOrder.Account) {
        const account = workOrder.Account;
        for (const key in account) {
            if (fieldMapping[key]) {
                mappedObject[fieldMapping[key]] = account[key as keyof Account];
            }
        }
    }

    // Mapea los requerimientos
    if (workOrder.Requerimiento) {
        workOrder.Requerimiento.forEach((requerimiento:any, index:any) => {
            for (const key in requerimiento) {
                if (fieldMapping[key]) {
                    mappedObject[`${fieldMapping[key]}_${index}`] = requerimiento[key as keyof Requerimiento];
                }
            }
        });
    }

    // Extrae y formatea las fechas y horas
    if (workOrder.FechaHoraRecepcionVehiculo) {
        const { date: fechaEnt, time: horaEnt } = formatDateTime(workOrder.FechaHoraRecepcionVehiculo);
        mappedObject['Servicios.dbo.Agenda.FechaEnt'] = fechaEnt;
        mappedObject['Servicios.dbo.Agenda.HoraEnt'] = horaEnt;
    }

    if (workOrder.FechaHoraEntregaVehiculo) {
        const { date: fechaSal, time: horaSal } = formatDateTime(workOrder.FechaHoraEntregaVehiculo);
        mappedObject['Servicios.dbo.Agenda.FechaSal'] = fechaSal;
        mappedObject['Servicios.dbo.Agenda.HoraSal'] = horaSal;
    }

    return mappedObject;
}

export function mapJsonRequirementToDatabase(json: any): { [key: string]: any } {
    const mappedObject: { [key: string]: any } = {};

    // Mapea los campos del WorkOrder
    const workOrder = json.WorkOrder;

    // Inicializa un array para los requerimientos mapeados
    const mappedRequerimientos: { [key: string]: any }[] = [];

    // Mapea los requerimientos
    if (workOrder.Requerimiento) {
        workOrder.Requerimiento.forEach((requerimiento: any) => {
            const mappedRequerimiento: { [key: string]: any } = {};
            for (const key in fieldMappingReclamos) {
                if (requerimiento.hasOwnProperty(key)) {
                    mappedRequerimiento[fieldMappingReclamos[key]] = requerimiento[key];
                }
            }
            if(requerimiento.Detalle){
                mappedRequerimiento['Servicios.dbo.AgendaReclamos.Reclamo'] = mappedRequerimiento['Servicios.dbo.AgendaReclamos.Reclamo']
                + ' ('
                + requerimiento.Detalle
                + ')';
            }
            if(requerimiento.Seccion){
                mappedRequerimiento['Servicios.dbo.AgendaReclamos.Categoria'] = requerimiento.Seccion;
            }
            mappedRequerimientos.push(mappedRequerimiento);
        });
    }

    // Añade los requerimientos mapeados al objeto principal
    mappedObject.Requerimientos = mappedRequerimientos;

    return mappedObject;
}

function formatDateTime(dateTime: string): { date: string, time: string } {
    const dateObj = new Date(dateTime);
    const date = dateObj.toISOString().split('T')[0] + ' 00:00:00.000';
    const time = dateObj.toTimeString().split(' ')[0].substring(0, 5).replace(':', '.');
    return { date, time };
}

export function formatDate(isoString: string) {
    if (!isoString || typeof isoString !== 'string') {
      throw new Error('Invalid input: please provide a valid ISO string');
    }
    return isoString.slice(0, 10) + ' 00:00:00.000';
}

export function formatDateSlashed(isoString: string) {
    if (!isoString || typeof isoString !== 'string') {
      throw new Error('Invalid input: please provide a valid ISO string');
    }
    
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function convertToGMT3(isoString?: string) {
    const date = new Date(isoString || '');

    const offset = 3 * 60 * 60 * 1000; // 3 horas en milisegundos
    const gmt3Date = new Date(date.getTime() - offset);

    return gmt3Date.toISOString().slice(0, 19) + 'Z';
}