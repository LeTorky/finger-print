export default interface IOAuthClient {
  getAccessToken(options: {}): Promise<string>;
  decodeAccessToken(token: string): any;
}

export const IOAuthClientSymbol = Symbol("IOAuthClient");
