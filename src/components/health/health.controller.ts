import { Request, Response } from 'express';

const health = async(req: Request, res: Response) => {
  return res.status(200).json({"data": "API is alive"});
};

export default {
  health,
};