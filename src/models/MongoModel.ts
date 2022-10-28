import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj:T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    return this._model.findOne({ _id });
  }

  public async read():Promise<T[]> {    
    const data = await this._model.find();
    return data;
  }

  public async delete(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    return this._model.findByIdAndDelete({ _id });
  }

  public async update(_id:string, obj:T):Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    const updateObj = await this._model.findByIdAndUpdate(
      _id, 
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
    return updateObj;
  }
}

export default MongoModel;