export function validadeCode(code: string): boolean {
  const codeLength = code.trim().length;
  if (codeLength !== 8) {
    return false;
  }
  return true;
}

export function validateName(name: string): boolean {
  const nameLength = name.trim().length;
  if (nameLength < 2 || nameLength > 80) {
    return false;
  }
  return true;
}

export function validatePrice(price: number): boolean {
  if (price <= 0) {
    return false;
  }
  return true;
}

export function validateQuantity(quantity: number): boolean {
  if (quantity <= 0) {
    return false;
  }
  return true;
}
