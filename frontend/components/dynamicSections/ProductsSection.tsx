'use client';

import { useEffect, useState } from 'react';
import { ProductsList } from '../ProductsList';
import { fetchProducts } from '@/services/fetchProducts';
import { Product } from '@/types/Product';
import { FechingState } from '@/types/FechingState';
import { RequestStatus } from '@/types/RequestStatus';
import { WithId } from '@/types/WithId';

export function ProductsSection() {
  const [fetching, setFeching] = useState<FechingState<WithId<Product>[]>>({
    status: RequestStatus.loading,
    data: [],
  });

  const isLoading = fetching.status === RequestStatus.loading ? true : false;

  useEffect(() => {
    async function loadProducts() {
      try {
        setFeching({ status: RequestStatus.loading });
        const products = await fetchProducts();
        setFeching({ status: RequestStatus.ok, data: products });
      } catch (error) {
        console.log(error);
        setFeching({ status: RequestStatus.error });
      }
    }
    loadProducts();
  }, []);
  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <div className="flex h-[40px] w-full bg-white rounded-xl border">
          <input className="w-full px-[8px]" type="text" placeholder="Search for a product..." />
        </div>
      </div>

      <ProductsList products={fetching.data || []} isLoading={isLoading} />
    </div>
  );
}
