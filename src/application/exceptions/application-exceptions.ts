export default class ApplicationException extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}
