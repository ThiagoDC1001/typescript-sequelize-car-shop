import { IService } from '../interfaces/IService';
import { ICar, carSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async read(): Promise<ICar[]> {
    const data = await this._car.read();
    return data;
  }

  public async readOne(_id: string): Promise<ICar> {
    if (_id.length !== 24) throw new Error(ErrorTypes.InvalidMongoId);    
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    const parsed = carSchema.partial().safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const carUpadated = await this._car.update(_id, parsed.data);
    if (Object.keys(obj).length === 0) { throw new Error(ErrorTypes.BadRequest); }
    if (!carUpadated) { throw new Error(ErrorTypes.EntityNotFound); }
    return carUpadated;
  }

  public async delete(_id:string): Promise<ICar | null> {
    const deleted = await this._car.delete(_id);
    if (_id.length !== 24) { throw new Error(ErrorTypes.InvalidMongoId); }
    if (!deleted) throw new Error(ErrorTypes.EntityNotFound);
    return deleted;
  }
}

export default CarService;
