import { Request, Response } from 'express';
import { requestBodyAgendaSchema } from './agenda.schema';

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

    return res.status(200).json({
        "data": req.body
    });
};

export default {
  agenda,
};