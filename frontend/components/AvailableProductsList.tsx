'use client';
import { fetchAvailableProducts } from '@/services/fetchAvailableProducts';
import { useEffect, useState } from 'react';
import { LabelValue } from './LabelValue';
import { ProductAndCommodity } from '@/types/ProductAndCommodity';

export function AvailableProductsList() {
  const [products, setProducts] = useState<ProductAndCommodity[]>();
  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await fetchAvailableProducts();
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    }
    loadProducts();
  }, []);

  const sortedProducts = products?.sort((a, b) => b.price - a.price)
  const renderProducts = sortedProducts?.map((product, index) => {
    return (
      <article
        key={index}
        className="flex flex-col gap-[16px] w-full wbg-white border border-black/80 p-[16px] rounded-lg"
      >
        <h1 className="text-xl">{product.productName}</h1>
        <div className="flex gap-[8px] text-lg">
          <LabelValue label="price" value={product.price} />
          <LabelValue label="quantity" value={product.commodityQuantity} />
          <div className="flex flex-col gap-[8px] min-lg:flex-row justify-between"></div>
        </div>
      </article>
    );
  });
  return <div className='flex flex-col gap-[16px] overflow-y-auto'>{renderProducts}</div>;
}
