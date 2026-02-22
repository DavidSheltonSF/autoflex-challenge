import { Product } from '../../types/Product';
import { InvalidCodeError } from '../errors/InvalidCodeError';
import { InvalidFieldError } from '../errors/InvalidFieldError';
import { validateCode, validateName, validatePrice } from './fieldsValidators';

export function validadeProduct(product: Product) {
  const { code, name, price } = product;

  if (!validateCode(code)) {
    throw new InvalidCodeError(code);
  }

  if (!validateName(name)) {
    throw new InvalidFieldError('name', name);
  }

  if (!validatePrice(price)) {
    throw new InvalidFieldError('price', price);
  }
}
