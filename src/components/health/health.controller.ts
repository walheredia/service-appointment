import { Request, Response } from 'express';
import UsuariosExternos from '../../models/UsuariosExternos';

const health = async(req: Request, res: Response) => {
  const usuarios = await UsuariosExternos.findAll();
  res.status(200).json({"data": "API is alive"});
};

export default {
  health,
};