import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;

async function generateHash(passwordPlain: string): Promise<string> {
  return await bcrypt.hash(passwordPlain, saltOrRounds);
}

async function compareHash(plain: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plain, hash);
}

export { generateHash, compareHash };
