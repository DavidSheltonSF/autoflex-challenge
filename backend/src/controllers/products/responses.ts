import { Product } from '../../types/Product';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type findAllResponse = HttpResponse<WithId<Product>[]>;
export type findByIdResponse = HttpResponse<WithId<Product> | { message: string }>;
export type createResponse = HttpResponse<WithId<Product> | { message: string }>;
export type updateByIdResponse = HttpResponse<WithId<Product> | { message: string }>;
export type deleteByIdResponse = HttpResponse<WithId<Product> | { message: string }>;
