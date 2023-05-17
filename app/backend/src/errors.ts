export default interface Error {
  status: number,
  message: string,
}

export const ALL_FIELDS_MUST_BE_FILLED: Error = {
  status: 400,
  message: 'All fields must be filled',
};

export const INVALID_EMAIL_OR_PASSWORD: Error = {
  status: 400,
  message: 'Email or password incorrect',
};
