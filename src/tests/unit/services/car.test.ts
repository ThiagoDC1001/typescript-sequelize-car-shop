import {expect} from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import {carMock, carMockPartial, carMockWithId, carMockWithIdWrong} from '../../mock';

describe ('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before (() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .onCall(1).resolves(null)
        .onCall(2).resolves(carMockWithId)
    sinon.stub(carModel, 'update').resolves(carMockWithId)
  });

  after(() => {
    sinon.restore();
  });

  describe('Create a car', () => {
    it('Success', async () => {
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      try {
        await carService.create({} as any)
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError)
      }
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      const carCreated = await carService.readOne(carMockWithId._id)

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      try {
        await carService.readOne(carMockWithId._id);
      }catch (error:any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound)
      }
    });
  });

  describe('Update car', () => {
    it('Success', async() => {
      const cars = await carService.update('635bf90ad3d24ecba759d35d', carMockWithId);
      expect(cars).to.be.deep.equal(carMockWithId);
    });
    it('Failure', async() => {
      let errorToTest;
      try {
        await carService.update(carMockWithId._id, carMockWithIdWrong)
      } catch (error: any) {
        errorToTest = error;
      }
      expect(errorToTest).to.be.instanceOf(ZodError);
    });    
  });

})