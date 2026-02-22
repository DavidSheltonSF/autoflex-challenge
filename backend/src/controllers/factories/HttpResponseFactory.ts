import { HttpResponse } from '../types/HttpResponse';

interface HttpResponseParams<T> {
  data?: T;
  message?: string;
}

export class HttpResponseFactory {
  private static makeResponse<T>(status: number, params: HttpResponseParams<T>): HttpResponse<T> {
    return { status, ...params };
  }
  static makeOk<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.makeResponse(200, params);
  }

  static makeCreated<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.makeResponse(201, params);
  }

  static makeBadRequest<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.makeResponse(400, params);
  }

  static makeNotFound<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.makeResponse(404, params);
  }
  static makeUnprocessableContent<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.makeResponse(422, params);
  }

  static makeServerError<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.makeResponse(500, params);
  }
}
