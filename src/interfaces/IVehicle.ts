import { z } from 'zod';

const vehicleSchema = z.object({
  model: z.string({
    required_error: 'Modelo é obrigatório',
    invalid_type_error: 'Modelo deve ser uma string',
  }).min(3),
  year: z.number({
    required_error: 'Ano é obrigatório',
    invalid_type_error: 'Ano deve ser um número',
  }).gte(1900).lte(2022),
  color: z.string({
    required_error: 'Cor é obrigatório',
    invalid_type_error: 'Cor deve ser uma string',
  }).min(3),
  status: z.boolean().optional(),
  buyValue: z.number({
    required_error: 'Valor de compra é obrigatório',
    invalid_type_error: 'Valor de compra é obrigatório',
  }).int(),
});

export type IVehicle = z.infer<typeof vehicleSchema>;

export { vehicleSchema };