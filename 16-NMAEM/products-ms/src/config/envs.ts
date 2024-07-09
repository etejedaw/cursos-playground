import 'dotenv/config';
import { z } from 'zod';

const Envs = z
  .object({
    PORT: z.string().transform(Number),
    DATABASE_URL: z.string().url(),
    NATS_SERVERS: z.string().transform((value) => value.split(',')),
  })
  .required()
  .readonly();

export type EnvsSchema = z.infer<typeof Envs>;
export const envs = Envs.parse(process.env);
