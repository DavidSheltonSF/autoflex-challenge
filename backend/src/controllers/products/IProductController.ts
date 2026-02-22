import { HttpResponse } from '../types/HttpResponse';
import { Product } from '../../types/Product';
import { WithId } from '../../types/WithId';
import { HttpRequest } from '../types/HttpRequest';
import { createResponse, findAllResponse, findByIdResponse } from './responses';

export interface IProductController {
  findAll: (httpRequest: HttpRequest) => Promise<findAllResponse>;
  findById: (httpRequest: HttpRequest) => Promise<findByIdResponse>;
  create: (httpRequest: HttpRequest) => Promise<createResponse>;
  updateById: (httpRequest: HttpRequest) => Promise<HttpResponse<WithId<Product>>>;
  deleteById: (httpRequest: HttpRequest) => Promise<HttpResponse<WithId<Product>>>;
}
