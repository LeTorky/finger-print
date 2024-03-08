export default interface ITokenManagement {
  IssueToken(content: {}, expirationTime: number): string;
  DecodeToken(token: string): any;
}

export const ITokenManagementSymbol = Symbol("ITokenManagement");
