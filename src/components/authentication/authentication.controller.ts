import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config';
import UsuariosExternos from '../../models/UsuariosExternos';
import logger from '../../logger';

const hash = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    if(!password)
      return res.status(400).json({
        message: 'Password has not been provided'
      });
      const hash = await createHash(password)
      return res.status(200).json({"data": hash})
  } catch (error) {
    const err = error as Error;
    logger.error('hash error:', { error });
    return res.status(500).json({
      message: 'An error has occurred.',
      detail: err.message
    });
  }
}

const createHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(400).json({"error": "Please provide username and password parameters"})
  }
  const usuario = await UsuariosExternos.findUserByUserName(username);
  if(!usuario){
    return res.status(401).json({"error": "Credentials are not valid"})
  }
  const hash = usuario?.PasswordHash; //get hash from db
  const passwordIsValid = await validatePassword(password, hash || '');
  if(passwordIsValid){
    const token = generateToken({username: username});
    const expiresInMs = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    const expiresIn = new Date(Date.now() + expiresInMs);
  
    return res.status(200).json({token, expiresIn});
  } else {
    return res.status(401).json({"error": "Credentials are not valid"})
  }
};

const validatePassword = async(password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

export const verifyToken = (token: string): object | string => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export default {
  hash,
  login
};