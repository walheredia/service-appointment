import { Request, Response } from 'express';
import { requestBodyAgendaSchema } from './agenda.schema';
import { Account, Requerimiento, WorkOrder } from './agenda.types';

const agenda = async(req: Request, res: Response) => {
    const agendaSchema = req.body;
    let errors;
    const agendaIsValid = await requestBodyAgendaSchema.validate(agendaSchema, { abortEarly: false })
    .then(() => {
        return true;
    })
    .catch((err) => {
        console.error("Errores de validación:", err.errors);
        errors = err.errors;
        return false;
    });

    if(!agendaIsValid){
        return res.status(400).json(errors);
    }

    const mappedData = mapJsonToDatabase(agendaSchema);

    return res.status(200).json({
        "data": req.body,
        "mappedData": mappedData
    });
};

const fieldMapping: { [key: string]: string } = {
    "AccountPersonMobilePhone": "Servicios.dbo.Agenda.Tel1",
    "AccountPersonEmail": "Servicios.dbo.Agenda.Email",
    "Modelo": "Servicios.dbo.Agenda.Modelo",
    "Kilometraje": "Servicios.dbo.Agenda.Km",
    /*"Síntoma": "Servicios.dbo.AgendaReclamos.Reclamo",
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
    "Tipo": "Servicios.dbo.AgendaReclamos.Tipo",*/
};

function mapJsonToDatabase(json:any): { [key: string]: any } {
    const mappedObject: { [key: string]: any } = {};

    // Mapea los campos del WorkOrder
    const workOrder = json.WorkOrder;

    const firstName = workOrder.AccountFirstName || '';
    const lastName = workOrder.AccountLastName || '';
    mappedObject['Servicios.dbo.Agenda.Cliente'] = `${firstName} ${lastName}`.trim();

    if(workOrder.EsperaElVehiculo == 'Si' || workOrder.ClienteSinCitaPrevia == 'true'){
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

    // Agrega los campos que son complejos (fechas, contactos, etc.)
    // Aquí puedes agregar lógica adicional para campos complejos

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

function formatDateTime(dateTime: string): { date: string, time: string } {
    const dateObj = new Date(dateTime);
    const date = dateObj.toISOString().split('T')[0] + ' 00:00:00.000';
    const time = dateObj.toTimeString().split(' ')[0].substring(0, 5).replace(':', '.');
    return { date, time };
}


export default {
  agenda,
};