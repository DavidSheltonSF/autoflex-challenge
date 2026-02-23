import { Commodity } from '../../types/Commodity';
import { Product } from '../../types/Product';
import { ProductAndCommodity } from '../../types/ProductAndCommodity';
import { ProductCommodityRelation } from '../../types/ProductCommodityRelation';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type findAllResponse = HttpResponse<WithId<Product>[]>;
export type findByIdResponse = HttpResponse<WithId<Product> | { message: string }>;
export type createResponse = HttpResponse<WithId<Product> | { message: string }>;
export type updateByIdResponse = HttpResponse<WithId<Product> | { message: string }>;
export type deleteByIdResponse = HttpResponse<WithId<Product> | { message: string }>;
export type findAllCommoditiesResponse = HttpResponse<WithId<Commodity>[]>;
export type addCommodityResponse = HttpResponse<
  WithId<ProductCommodityRelation> | { message: string }
>;
export type removeCommodityResponse = HttpResponse<
  WithId<ProductCommodityRelation> | { message: string }
>;
export type findAllAvailableProductsResponse = HttpResponse<ProductAndCommodity[]>;
