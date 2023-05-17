import { compare } from 'bcryptjs';

async function passwordValidation(recivedPassword: string, correctPassword: string) {
  const pass = await compare(recivedPassword, correctPassword);
  return pass;
}

export default passwordValidation;
