import { ICar } from "../interfaces/ICar";

const carMock: ICar = {
  model: 'Shelby GT 500',
  year: 2020,
  color: 'orange',
  status: true,
  buyValue: 500000,
  doorsQty: 2,
  seatsQty: 4,
};

const carMockWithId: ICar & {_id: string}= {
_id: '635bf90ad3d24ecba759d35d',
  model: 'Shelby GT 500',
  year: 2020,
  color: 'orange',
  status: true,
  buyValue: 500000,
  doorsQty: 2,
  seatsQty: 4,
};

export { carMock, carMockWithId}