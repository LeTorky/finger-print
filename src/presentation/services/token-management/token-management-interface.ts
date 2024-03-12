export default interface ITokenManagement {
  IssueToken(
    content: {},
    tokenExpirationTime: number,
    refreshTokenExpirationTime: number
  ): { token: string; refreshToken: string };
  DecodeToken(token: string): any;
}

export const ITokenManagementSymbol = Symbol("ITokenManagement");
