import { calculateProductQuantityToMake } from './calculateProductQuantityToMake';

// Returns only the product that can be made with the available commodities
export function getViableProducts(data: any): any {
  const products: any = [];

  data.forEach((row: any) => {
    const result = calculateProductQuantityToMake(row);
    if (result && result > 0) {
      const validatedProduct = row[0];
      products.push({
        id: validatedProduct.id,
        name: validatedProduct.name,
        price: validatedProduct.price,
        quantity: result,
      });
    }
  });

  return products;
}
