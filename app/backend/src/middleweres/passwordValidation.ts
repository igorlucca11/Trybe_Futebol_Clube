import { compare } from 'bcryptjs';

async function passwordValidation(recivedPassword: string, correctPassword: string) {
  const pass = await compare(recivedPassword, correctPassword);
  console.log(pass);
  console.log(recivedPassword);
  return pass;
}

export default passwordValidation;
