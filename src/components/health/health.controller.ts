import { Request, Response } from 'express';

const health = (req: Request, res: Response) => {
  res.status(200).json({"data": "API is alive"});
};

export default {
  health,
};