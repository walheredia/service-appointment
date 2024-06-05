import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config';

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
    res.status(500).json({
      message: 'An error has occurred.',
      detail: error
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
    res.status(400).json({"error": "Please provide username and password parameters"})
  }
  const hash = "$2b$10$0A.pwltNBldyFjrzQDrwR.movH5IVy2Z4b7D2Dii9DHrZFD41j9zG" //get hash from db
  const passwordIsValid = await validatePassword(password, hash);
  if(passwordIsValid){
    const token = generateToken({username: username});
    const expiresInMs = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    const expiresIn = new Date(Date.now() + expiresInMs);
  
    res.status(200).json({token, expiresIn});
  } else {
    res.status(401).json({"error": "unauthorized"})
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