import User from "src/domain/aggregates/user";
import IUserEvent from "../user-events/user-event-interface";
import IUserEventBus from "./user-event-bus-interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class UserEventBus implements IUserEventBus {
  private subscribers: User[] = [];

  publishUserEvent(userEvent: IUserEvent): void {
    this.subscribers.forEach((subscriber) =>
      subscriber.handleUserEvent(userEvent)
    );
  }

  subscribeToUserEvent(user: User): void {
    this.subscribers.push(user);
  }
}
