import { InvalidCodeError } from '../../services/errors/InvalidCodeError';
import { InvalidFieldError } from '../../services/errors/InvalidFieldError';
import { IProductService } from '../../services/products/IProductService';
import { HttpResponseFactory } from '../factories/HttpResponseFactory';
import { getProductMissingFields } from '../helpers/getProductMissingFields';
import { HttpRequest } from '../types/HttpRequest';

import {
  findAllResponse,
  findByIdResponse,
  createResponse,
  deleteByIdResponse,
  updateByIdResponse,
} from './responses';

export class ProductController {
  constructor(private readonly productService: IProductService) {}
  async findAll(httpRequest: HttpRequest): Promise<findAllResponse> {
    const result = await this.productService.findAll();
    return HttpResponseFactory.makeOk({ data: result });
  }
  async findById(httpRequest: HttpRequest): Promise<findByIdResponse> {
    const { id } = httpRequest.params;
    const result = await this.productService.findById(id);
    if (!result) {
      return HttpResponseFactory.makeNotFound({ message: `Product with id '${id} was not found.` });
    }

    return HttpResponseFactory.makeOk({ data: result });
  }
  async create(httpRequest: HttpRequest): Promise<createResponse> {
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
  }
  async updateById(httpRequest: HttpRequest): Promise<updateByIdResponse> {
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
      const result = await this.productService.updateById(id, { code, name, price });

      if (!result) {
        return HttpResponseFactory.makeNotFound({
          message: `Product with id '${id} was not found`,
        });
      }

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
  }
  async deleteById(httpRequest: HttpRequest): Promise<deleteByIdResponse> {
    const { id } = httpRequest.params;

    if (!id) {
      return HttpResponseFactory.makeBadRequest({ message: 'Missing product id' });
    }

    const result = await this.productService.deleteById(id);
    if (!result) {
      return HttpResponseFactory.makeNotFound({
        message: `Product with id '${id}' was not found`,
      });
    }

    return HttpResponseFactory.makeOk({ data: result });
  }
}
