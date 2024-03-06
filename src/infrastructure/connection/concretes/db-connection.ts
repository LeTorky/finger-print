import mongoose from "mongoose";
import IDBConnection from "../interfaces/db-connection-interface";

export default class MongooseConnection implements IDBConnection {
  private connectionString: string;
  private options: any;

  constructor(connectingString: string, options: any = {}){
    this.connectionString = connectingString;
    this.options = options;
  }
  connect(): any{
    mongoose.connect(this.connectionString, this.options);
    return mongoose.connection;
  }
}
