import 'dotenv/config';
import { z } from 'zod';

const Envs = z
  .object({
    PORT: z.string().transform(Number),
    PRODUCT_MICROSERVICE_HOST: z.string(),
    PRODUCT_MICROSERVICE_PORT: z.string().transform(Number),
  })
  .readonly();

export type EnvsSchema = z.infer<typeof Envs>;
export const envs = Envs.parse(process.env);
