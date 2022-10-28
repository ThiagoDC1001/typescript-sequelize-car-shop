import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const obj = req.body;
    const createdObj = await this._service.create(obj);
    res.status(201).json(createdObj);
  }
}