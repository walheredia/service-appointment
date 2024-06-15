import { Request, Response } from 'express';
import { requestBodyAgendaSchema, requestDeleteBodyAgendaSchema, requestUpdateBodyAgendaSchema } from './agenda.schema';
import { Account, Requerimiento, WorkOrder } from './agenda.types';
import Agenda from '../../models/Agenda';
import { mapJsonRequirementToDatabase, mapJsonToDatabase, mapToAgendaAttributes, mapToReclamosAttributes } from './agenda.utils';
import Reclamos, { ReclamosAttributes } from '../../models/AgendaReclamos';
import { getServicesConnection } from '../../config/database';

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
        agenda = await Agenda.create(newAgendaAttributes)
        for (const reclamo of newAgendaReclamosAttributes) {
            await Reclamos.create(reclamo, agenda);
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

const actualizaAgenda = async(req: Request, res: Response) => {
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

        let agenda = await Agenda.findByReference(agendaSchema.WorkOrder.IdPreOrden);
        const mappedData = mapJsonToDatabase(agendaSchema);
        const newAgendaAttributes = mapToAgendaAttributes(mappedData);
        await Agenda.update(agendaSchema.WorkOrder.IdPreOrden, newAgendaAttributes)

        return res.status(200).json({
            "IdPreOrden": agenda?.Referencia,
            "ResultadoProceso": "El Turno fue reagendado correctamente"
        });

    } catch (error) {
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

        const servicesConnection = getServicesConnection();
        await servicesConnection.query('BEGIN TRANSACTION');
        let agenda:number = agendaSchema.WorkOrder.IdPreOrden;
        try {
            await Reclamos.deleteAllByReference(agenda);
            await Agenda.delete(agenda)
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