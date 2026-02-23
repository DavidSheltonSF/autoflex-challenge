import { GroupedProductsAndCommodities } from '../types/GroupedProductsAndCommodities';
import { ProductAndCommodity } from '../types/ProductAndCommodity';
import { calculateProductQuantityToMake } from './calculateProductQuantityToMake';

// Returns only the product that can be made with the available commodities
export function getViableProducts(data: GroupedProductsAndCommodities): ProductAndCommodity[] {
  const products: any = [];

  data.forEach((group) => {
    const result = calculateProductQuantityToMake(group);
    if (result && result > 0) {
      const validatedProduct = group[0];
      products.push({
        productId: validatedProduct?.productId,
        productCode: validatedProduct?.productCode,
        productName: validatedProduct?.productName,
        price: validatedProduct?.price,
        commodityQuantity: result,
      });
    }
  });

  return products;
}
