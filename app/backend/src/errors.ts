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

export const INVALID_QUERY = new MyErrors('Invalid query', 401);

const TWO_EQUAL_TEAMS = 'It is not possible to create a match with two equal teams';

export const INVALID_MATCH = new MyErrors(TWO_EQUAL_TEAMS, 422);

export const TEAM_NOT_FOUND = new MyErrors('There is no team with such id!', 404);
