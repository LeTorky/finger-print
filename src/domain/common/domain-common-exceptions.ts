export default class NoPermission extends Error {
  statusCode = 403;
  constructor(message: string) {
    super(message);
  }
}
