'use client';

import { useContext, useEffect, useState } from 'react';
import { ProductsList } from '../lists/ProductsList';
import { fetchProducts } from '@/services/fetchProducts';
import { Product } from '@/types/Product';
import { FechingState } from '@/types/FechingState';
import { RequestStatus } from '@/types/RequestStatus';
import { WithId } from '@/types/WithId';
import { SearchBar } from '../SearchBar';
import { RerenderItemsContext } from '@/contexts/RerenderItemsContext';

export function ProductsSection() {
  const [fetching, setFeching] = useState<FechingState<WithId<Product>[]>>({
    status: RequestStatus.loading,
    data: [],
  });

  const isLoading = fetching.status === RequestStatus.loading ? true : false;

  const reRenderItemsContext = useContext(RerenderItemsContext);
  if (!reRenderItemsContext) {
    throw Error('Missing RerenderItemsContext');
  }

  const { renderItems } = reRenderItemsContext;

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
  }, [renderItems]);
  return (
    <div className="flex flex-col gap-[24px]">
      <SearchBar />
      <ProductsList products={fetching.data || []} isLoading={isLoading} />
    </div>
  );
}
