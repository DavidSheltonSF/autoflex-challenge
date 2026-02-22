import { Product } from '../../types/Product';
import { InvalidCodeError } from '../errors/InvalidCodeError';
import { InvalidFieldError } from '../errors/InvalidFieldError';
import { validadeCode, validateName, validatePrice } from './fieldsValidators';

export function validadeProduct(product: Product) {
  const { code, name, price } = product;

  if (!validadeCode(code)) {
    throw new InvalidCodeError(code);
  }

  if (!validateName(name)) {
    throw new InvalidFieldError('name', name);
  }

  if (!validatePrice(price)) {
    throw new InvalidFieldError('price', price);
  }
}
