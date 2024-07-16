import { Request, Response } from 'express';
import { requestBodyAgendaSchema, requestDeleteBodyAgendaSchema, requestUpdateBodyAgendaSchema } from './agenda.schema';
import { Account, Requerimiento, WorkOrder } from './agenda.types';
import Agenda from '../../models/Agenda';
import { mapJsonRequirementToDatabase, mapJsonToDatabase, mapToAgendaAttributes, mapToReclamosAttributes } from './agenda.utils';
import Reclamos, { ReclamosAttributes } from '../../models/AgendaReclamos';
import { getServicesConnection } from '../../config/database';
import AgendaDias, { AgendaDiasAttributes } from '../../models/AgendaDias';
import { AuthRequest } from '../../middlewares/auth';

const agenda = async(req: AuthRequest, res: Response) => {
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
        return res.status(400).json({errors});
    }

    const mappedData = mapJsonToDatabase(agendaSchema);
    const newAgendaAttributes = mapToAgendaAttributes(mappedData);

    const mappedRequirementsData = mapJsonRequirementToDatabase(agendaSchema).Requerimientos
    const newAgendaReclamosAttributes: ReclamosAttributes[] = [];
    mappedRequirementsData.forEach((requirementData:ReclamosAttributes) => {
        newAgendaReclamosAttributes.push(mapToReclamosAttributes(requirementData))
    });

    const servicesConnection = getServicesConnection();
    await servicesConnection.query('BEGIN TRANSACTION');
    let agenda:number;
    try {
        agenda = await Agenda.create(newAgendaAttributes, req.user ?? '')
        const agendaDiaAttributes = {} as AgendaDiasAttributes;
        agendaDiaAttributes.CodTaller = '1';
        agendaDiaAttributes.Dia = newAgendaAttributes.FechaEnt;
        agendaDiaAttributes.Item = 1;
        agendaDiaAttributes.Referencia = agenda;
        const agendaDia = await AgendaDias.create(agendaDiaAttributes);

        for (const reclamo of newAgendaReclamosAttributes) {
            reclamo.TpoEstimado = calcularTiempoEstimado(reclamo.TpoEstimado)
            reclamo.Tipo = obtenerTipo(reclamo.Tipo)
            reclamo.Categoria = obtenerCategoria(reclamo.Categoria);
            
            await Reclamos.create(reclamo, agenda);
        }

        //si el turno viene dado de baja, se da de baja en agenda dia
        if(agendaSchema.WorkOrder.Cancelado) {
            await AgendaDias.deleteAgendaDia(agenda);
        }
        await servicesConnection.query('COMMIT');
    } catch (error) {
        await servicesConnection.query('ROLLBACK');
        return res.status(500).json({
            message: 'An error has occurred.',
            detail: error
        });
    }

    return res.status(200).json({
        "IdPreOrden": agenda,
        "ResultadoProceso": "Turno creado correctamente"
    });
};

function calcularTiempoEstimado(tpoEstimado: string): string{
    switch (tpoEstimado) {
        case "15'":
        case "15":
            return "15";
        case "30'":
        case "30":
            return "30";
        case "1hs":
            return "60";
        case "1:30hs":
            return "90";
        default:
            return "0";
    }
}

function obtenerTipo(tipo?: string | number): number {
    if (typeof tipo === 'string') {
        const tipoLower = tipo.toLowerCase();
        switch (tipoLower) {
            case 'mantenimiento':
                return 1;
            case 'reparación gral.':
            case 'reparación gral':
            case 'reparación':
                return 2;
            case 'garantía':
                return 3;
            case 'campaña de serv.':
            case 'campaña de serv':
            case 'campaña de servicio':
                return 4;
            default:
                return 0;
        }
    }
    return 0;
}

function obtenerCategoria(categoria?: string | number): number {
    if (typeof categoria === 'string') {
        const categoriaLower = categoria?.toLowerCase();
        switch (categoriaLower) {
            case 'falla expresada por el cliente':
            case 'falla expresada por el cliente.':
                return 1;
            case 'requerimiento/trabajo a realizar':
            case 'requerimiento/trabajo a realizar.':
                return 2;
            default:
                return 0;
        }
    }
    return 0;
}

const actualizaAgenda = async(req: AuthRequest, res: Response) => {
    const servicesConnection = getServicesConnection();
    try {
        const agendaSchema = req.body;
        let errors;
        
        const agendaIsValid = await requestUpdateBodyAgendaSchema.validate(agendaSchema, { abortEarly: false })
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.error("Errores de validación:", err.errors);
            errors = err.errors;
            return false;
        });

        if(!agendaIsValid){
            return res.status(400).json({errors});
        }
        
        await servicesConnection.query('BEGIN TRANSACTION');

        let agenda = await Agenda.findByReference(agendaSchema.WorkOrder.IdPreOrden);

        if(!agenda) {
            return res.status(404).json({
                "ResultadoProceso": "No existe una agenda con el IdPreOrden proporcionado"
            });
        }
        const mappedData = mapJsonToDatabase(agendaSchema);
        const newAgendaAttributes = mapToAgendaAttributes(mappedData);
        await Agenda.update(agendaSchema.WorkOrder.IdPreOrden, newAgendaAttributes, req.user ?? '')

        const agendaDiaAttributes = {} as AgendaDiasAttributes;
        agendaDiaAttributes.CodTaller = '1';
        agendaDiaAttributes.Dia = newAgendaAttributes.FechaEnt;
        agendaDiaAttributes.Item = 1;
        agendaDiaAttributes.Referencia = (agendaSchema.WorkOrder.IdPreOrden);
        const agendaDia = await AgendaDias.updateAgendaDia(agendaDiaAttributes);
        await servicesConnection.query('COMMIT');
        return res.status(200).json({
            "IdPreOrden": agenda?.Referencia,
            "ResultadoProceso": "El Turno fue reagendado correctamente"
        });
    } catch (error) {
        await servicesConnection.query('ROLLBACK');
        return res.status(500).json({
            message: 'An error has occurred.',
            detail: error
        });
    }
}

const eliminaAgenda = async(req: Request, res: Response) => {
    try {
        const agendaSchema = req.body;
        let errors;
        
        const agendaIsValid = await requestDeleteBodyAgendaSchema.validate(agendaSchema, { abortEarly: false })
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.error("Errores de validación:", err.errors);
            errors = err.errors;
            return false;
        });

        if(!agendaIsValid){
            return res.status(400).json({errors});
        }

        let agendaExist = await Agenda.findByReference(agendaSchema.WorkOrder.IdPreOrden);

        if(!agendaExist) {
            return res.status(404).json({
                "ResultadoProceso": "No existe una agenda con el IdPreOrden proporcionado"
            });
        }

        const servicesConnection = getServicesConnection();
        await servicesConnection.query('BEGIN TRANSACTION');
        let agenda:number = agendaSchema.WorkOrder.IdPreOrden;
        try {
            //await Reclamos.deleteAllByReference(agenda);
            //await Agenda.delete(agenda)
            await AgendaDias.deleteAgendaDia(agenda);

            await servicesConnection.query('COMMIT');
        } catch (error) {
            await servicesConnection.query('ROLLBACK');
            return res.status(500).json({
                message: 'An error has occurred.',
                detail: error
            });
        }

        return res.status(200).json({
            "IdPreOrden": agenda,
            "ResultadoProceso": "El Turno fue anulado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred.',
            detail: error
        });
    }
}


export default {
  agenda,
  actualizaAgenda,
  eliminaAgenda
};