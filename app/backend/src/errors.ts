export default class MyErrors extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super();
    this.name = message;
    this.message = message;
    this.status = status;
  }
}

export const ALL_FIELDS_MUST_BE_FILLED = new MyErrors('All fields must be filled', 400);

export const INVALID_EMAIL_OR_PASSWORD = new MyErrors('Invalid email or password', 401);

export const INVALID_TOKEN = new MyErrors('Token must be a valid token', 401);

export const TOKEN_NOT_FOUND = new MyErrors('Token not found', 401);
