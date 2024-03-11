import User from "src/domain/aggregates/user";
import IUserEvent from "../user-events/user-event-interface";

export default interface IUserEventBus {
  publishUserEvent(userEvent: IUserEvent): void;
  subscribeToUserEvent(user: User): void;
}

export const IUserEventBusSymbol = Symbol("IUserEventBus");
