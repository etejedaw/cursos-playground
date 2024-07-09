import 'dotenv/config';
import { z } from 'zod';

const Envs = z
  .object({
    PORT: z.string().transform(Number),
    NATS_SERVERS: z.string().transform((value) => value.split(',')),
  })
  .readonly();

export type EnvsSchema = z.infer<typeof Envs>;
export const envs = Envs.parse(process.env);
