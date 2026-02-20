// Calculate how many products are possible to make with the available commodities
export function calculateProductQuantityToMake(
  productCommoditiesCounts: {
    commodityquantity: number;
    availablecommodityquantity: number;
  }[]
): number {
  let maxProductQuantity = 0;

  productCommoditiesCounts.forEach((count) => {
    const calc = Math.floor(count.availablecommodityquantity / count.commodityquantity);
    if (maxProductQuantity === 0) {
      maxProductQuantity = calc;
      return;
    }

    if (calc < maxProductQuantity) {
      maxProductQuantity = calc;
    }
  });

  return maxProductQuantity;
}
