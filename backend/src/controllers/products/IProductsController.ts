import { HttpRequest } from '../types/HttpRequest';
import {
  addCommodityResponse,
  createResponse,
  deleteByIdResponse,
  findAllAvailableProductsResponse,
  findAllCommoditiesResponse,
  findAllResponse,
  findByIdResponse,
  removeCommodityResponse,
  updateByIdResponse,
} from './responses';

export interface IProductsController {
  findAll: (httpRequest: HttpRequest) => Promise<findAllResponse>;
  findById: (httpRequest: HttpRequest) => Promise<findByIdResponse>;
  create: (httpRequest: HttpRequest) => Promise<createResponse>;
  updateById: (httpRequest: HttpRequest) => Promise<updateByIdResponse>;
  deleteById: (httpRequest: HttpRequest) => Promise<deleteByIdResponse>;
  findAllCommodities: (httpRequest: HttpRequest) => Promise<findAllCommoditiesResponse>;
  addCommodity: (httpRequest: HttpRequest) => Promise<addCommodityResponse>;
  removeCommodity: (httpRequest: HttpRequest) => Promise<removeCommodityResponse>;
  findAllAvailableProducts: (httpRequest: HttpRequest) => Promise<findAllAvailableProductsResponse>;
}
