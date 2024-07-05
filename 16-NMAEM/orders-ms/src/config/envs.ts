import 'dotenv/config';
import { z } from 'zod';

const Envs = z
  .object({
    PORT: z.string().transform(Number),
  })
  .readonly();

export type EnvsSchema = z.infer<typeof Envs>;
export const envs = Envs.parse(process.env);
