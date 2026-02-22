import { HttpRequest } from '../types/HttpRequest';
import {
  createResponse,
  deleteByIdResponse,
  findAllResponse,
  findByIdResponse,
  updateByIdResponse,
} from './responses';

export interface IProductsController {
  findAll: (httpRequest: HttpRequest) => Promise<findAllResponse>;
  findById: (httpRequest: HttpRequest) => Promise<findByIdResponse>;
  create: (httpRequest: HttpRequest) => Promise<createResponse>;
  updateById: (httpRequest: HttpRequest) => Promise<updateByIdResponse>;
  deleteById: (httpRequest: HttpRequest) => Promise<deleteByIdResponse>;
}
