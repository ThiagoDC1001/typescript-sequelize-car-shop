export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  BadRequest = 'BadRequest',
  Created = 'Created',
  Ok = 'Ok',
  SuccessNoResponse = 'SuccessNoResponse',
  UNAUTHORIZED = 'UNAUTHORIZED',
  SemanticError = 'SemanticError',
  NotFound = 'NotFound',
}

type ErrorResponseObject = { 
  message: string,
  httpStatus: number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    httpStatus: 400,
  },
  BadRequest: {
    message: 'Bad request',
    httpStatus: 400,
  },
  Created: {
    message: 'Created',
    httpStatus: 201,
  },
  SuccessNoResponse: {
    message: 'Success no response',
    httpStatus: 204,
  },
  Ok: {
    message: 'Ok',
    httpStatus: 200,
  },
  UNAUTHORIZED: {
    message: 'UNAUTHORIZED',
    httpStatus: 401,
  },
  SemanticError: {
    message: 'Semantic Error',
    httpStatus: 422,
  },
  NotFound: {
    message: 'Not Found',
    httpStatus: 404,
  },
};