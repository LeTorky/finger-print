export default class SessionException extends Error {
  statusCode = 401;
  constructor(message: string) {
    super(message);
  }
}
