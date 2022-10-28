import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { carMock, carMockWithId} from '../../mock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  })

  describe('creating a new car', () => {
    it('successfully creates a new car', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carModel.readOne(carMockWithId._id);
      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carModel.readOne('123ERRADO');
      } catch (err: any) {
        expect(err.message).to.be.eq('InvalidMongoId');
      }
    })
  })
})