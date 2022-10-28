import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseModel = new Schema<ICar>({
  doorsQty: Number,
  seatsQty: Number,  
});

class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carMongooseModel)) {
    super(model);
  }
}

export default CarModel;