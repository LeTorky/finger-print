import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response } from "express";
import NoPermission from "src/domain/common/domain-common-exceptions";
import SessionException from "src/presentation/services/exceptions/session-exceptions";
import CORSException from "../exceptions/cors-exceptions";

const errorClassLookup = {
  NoPermission,
  SessionException,
  CORSException,
};

@Catch()
export default class ExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception.constructor.name in errorClassLookup
          ? exception.statusCode
          : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof BadRequestException
        ? exception.getResponse()["message"]
        : exception.message;

    return response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
