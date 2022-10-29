import {expect} from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import {carMock, carMockWithId} from '../../mock';
import CarController from '../../../controllers/CarController';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel'

describe ('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock)
    sinon.stub(carService, 'readOne').resolves(carMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res)
  });

  after(() => {
    sinon.restore()
  })

  describe('Create a car', () => {
    it('Success', async () => {
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { _id: carMockWithId._id};
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    })
  })
})