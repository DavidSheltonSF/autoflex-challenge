import { stringIsNumeric } from '../../utils/stringIsNumeric';
import { InvalidIdError } from '../errors/InvalidIdError';

export function checkIdIsNumeric(id: string) {
  if (!stringIsNumeric(id)) {
    throw new InvalidIdError(id);
  }
}
