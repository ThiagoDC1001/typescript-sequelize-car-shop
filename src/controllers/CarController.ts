import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service:IService<ICar>) {

  }

  public async create(req: Request, res: Response<ICar>) {
    const obj = req.body;
    const createdObj = await this._service.create(obj);
    res.status(201).json(createdObj);
  }
  public async read(req: Request, res: Response): Promise<void> {
    const data = await this._service.read();
    res.status(200).json(data);
  }
  public async readOne(req: Request, res: Response): Promise<void> {    
    const { id } = req.params;    
    const data = await this._service.readOne(id);
    res.status(200).json(data);
  }
}
