import { ICommoditiesService } from '../../services/commodities/ICommoditiesService';
import { InvalidCodeError } from '../../services/errors/InvalidCodeError';
import { InvalidFieldError } from '../../services/errors/InvalidFieldError';
import { IProductService } from '../../services/products/IProductService';
import { HttpResponseFactory } from '../factories/HttpResponseFactory';
import { getProductMissingFields } from '../helpers/getProductMissingFields';
import { HttpRequest } from '../types/HttpRequest';
import { IProductsController } from './IProductsController';

import {
  findAllResponse,
  findByIdResponse,
  createResponse,
  deleteByIdResponse,
  updateByIdResponse,
  addCommodityResponse,
  findAllCommoditiesResponse,
  findAllAvailableProductsResponse,
} from './responses';

export class ProductsController implements IProductsController {
  constructor(
    private readonly productService: IProductService,
    private readonly commoditiesService: ICommoditiesService
  ) {}
  findAll = async (httpRequest: HttpRequest): Promise<findAllResponse> => {
    const result = await this.productService.findAll();
    return HttpResponseFactory.makeOk({ data: result });
  };

  findById = async (httpRequest: HttpRequest): Promise<findByIdResponse> => {
    const { id } = httpRequest.params;
    const result = await this.productService.findById(id);
    if (!result) {
      return HttpResponseFactory.makeNotFound({ message: `Product with id '${id} was not found.` });
    }

    return HttpResponseFactory.makeOk({ data: result });
  };

  create = async (httpRequest: HttpRequest): Promise<createResponse> => {
    try {
      const { body } = httpRequest;
      if (!body) {
        return HttpResponseFactory.makeBadRequest({ message: 'Missing body request' });
      }

      const missingFields = getProductMissingFields(body);
      if (missingFields.length > 0) {
        return HttpResponseFactory.makeBadRequest({
          message: `Missing required fields: ${missingFields.toLocaleString()}`,
        });
      }

      const { code, name, price } = body;
      if (!code || !name || !price) {
        return HttpResponseFactory.makeBadRequest({ message: `Missing required fields` });
      }

      const result = await this.productService.create({ code, name, price });

      return HttpResponseFactory.makeOk({ data: result });
    } catch (error: any) {
      console.log(error);

      if (error instanceof InvalidCodeError) {
        return HttpResponseFactory.makeUnprocessableContent({ message: error.message });
      }

      if (error instanceof InvalidFieldError) {
        return HttpResponseFactory.makeUnprocessableContent({ message: error.message });
      }

      return HttpResponseFactory.makeServerError({ message: 'Something went wrong in the server' });
    }
  };
  updateById = async (httpRequest: HttpRequest): Promise<updateByIdResponse> => {
    try {
      const { id } = httpRequest.params;
      const { body } = httpRequest;

      if (!id) {
        return HttpResponseFactory.makeBadRequest({ message: 'Missing product id' });
      }

      if (!body) {
        return HttpResponseFactory.makeBadRequest({ message: 'Missing body request' });
      }

      const missingFields = getProductMissingFields(body);
      if (missingFields.length > 0) {
        return HttpResponseFactory.makeBadRequest({
          message: `Missing required fields: ${missingFields.toString()}`,
        });
      }

      const { code, name, price } = body;

      const exists = await this.productService.checkExistence(id);
      if (!exists) {
        return HttpResponseFactory.makeNotFound({
          message: `Product with id '${id} was not found`,
        });
      }
      const result = await this.productService.updateById(id, { code, name, price });

      return HttpResponseFactory.makeOk({ data: result });
    } catch (error) {
      console.log(error);

      if (error instanceof InvalidCodeError) {
        return HttpResponseFactory.makeUnprocessableContent({ message: error.message });
      }

      if (error instanceof InvalidFieldError) {
        return HttpResponseFactory.makeUnprocessableContent({ message: error.message });
      }

      return HttpResponseFactory.makeServerError({ message: 'Something went wrong in the server' });
    }
  };
  deleteById = async (httpRequest: HttpRequest): Promise<deleteByIdResponse> => {
    const { id } = httpRequest.params;

    if (!id) {
      return HttpResponseFactory.makeBadRequest({ message: 'Missing product id' });
    }

    const exists = await this.productService.checkExistence(id);
    if (!exists) {
      return HttpResponseFactory.makeNotFound({
        message: `Product with id '${id} was not found`,
      });
    }
    const result = await this.productService.deleteById(id);

    return HttpResponseFactory.makeOk({ data: result });
  };

  findAllCommodities = async (httpRequest: HttpRequest): Promise<findAllCommoditiesResponse> => {
    const { id } = httpRequest.params;
    if (!id) {
      return HttpResponseFactory.makeBadRequest({ message: 'Missing product id' });
    }

    const result = await this.productService.findAllCommodities(id);
    return HttpResponseFactory.makeOk({ data: result });
  };

  addCommodity = async (httpRequest: HttpRequest): Promise<addCommodityResponse> => {
    try {
      const productId = httpRequest.params.id;

      const { body } = httpRequest;

      if (!productId) {
        return HttpResponseFactory.makeBadRequest({ message: 'Missing product id' });
      }
      if (!body) {
        return HttpResponseFactory.makeBadRequest({ message: 'Missing body request' });
      }

      const { commodityId, quantity } = body;
      if (!commodityId || !quantity) {
        return HttpResponseFactory.makeBadRequest({
          message: `Missing required fields`,
        });
      }

      const productExists = await this.productService.checkExistence(productId);
      if (!productExists) {
        return HttpResponseFactory.makeNotFound({
          message: `Product with id '${productId}' was not found`,
        });
      }

      const commodityExists = await this.commoditiesService.checkExistence(commodityId);
      if (!commodityExists) {
        return HttpResponseFactory.makeNotFound({
          message: `Commodity with it '${commodityId}' was not found`,
        });
      }

      const result = await this.productService.addCommodity({ productId, commodityId, quantity });

      return HttpResponseFactory.makeCreated({
        data: result,
      });
    } catch (error) {
      console.log(error);
      return HttpResponseFactory.makeServerError({ message: 'Something went wrong in the server' });
    }
  };

  removeCommodity = async (httpRequest: HttpRequest): Promise<addCommodityResponse> => {
    try {
      const { productId, commodityId } = httpRequest.params;

      if (!productId || !commodityId) {
        return HttpResponseFactory.makeBadRequest({
          message: `Missing required params productId or commodityId`,
        });
      }

      const productExists = await this.productService.checkExistence(productId);
      if (!productExists) {
        return HttpResponseFactory.makeNotFound({
          message: `Product with it '${productId}' was not found`,
        });
      }

      const commodityExists = await this.commoditiesService.checkExistence(commodityId);
      if (!commodityExists) {
        return HttpResponseFactory.makeNotFound({
          message: `Commodity with it '${commodityId}' was not found`,
        });
      }

      const result = await this.productService.removeCommodity(productId, commodityId);

      return HttpResponseFactory.makeOk({
        data: result,
      });
    } catch (error) {
      console.log(error);
      return HttpResponseFactory.makeServerError({ message: 'Something went wrong in the server' });
    }
  };

  findAllAvailableProducts = async (
    httpRequest: HttpRequest
  ): Promise<findAllAvailableProductsResponse> => {
    const result = await this.productService.findAllAvailableProducts();
    return HttpResponseFactory.makeOk({ data: result });
  };
}
