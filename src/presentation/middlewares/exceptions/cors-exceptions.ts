export default class CORSException extends Error {
  statusCode = 401;
  constructor(message: string) {
    super(message);
  }
}
