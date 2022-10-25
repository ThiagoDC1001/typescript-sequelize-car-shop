import { z } from 'zod';

const vehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean(),
  buyValue: z.number(),
}).partial();

export type IVehicle = z.infer<typeof vehicleSchema>;

export { vehicleSchema };