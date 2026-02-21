'use client';
import { BaseModal } from './BaseModal';
import { useContext, useEffect, useState } from 'react';
import { FechingState } from '@/types/FechingState';
import { Product } from '@/types/Product';
import { fetchProductById } from '@/services/fetchProductById';
import { RequestStatus } from '@/types/RequestStatus';
import { LabelValue } from '../LabelValue';
import { ProductCommoditiesList } from '../lists/ProductCommoditiesList';
import { fetchProductCommodities } from '@/services/fetchProductCommodities';
import { Commodity } from '@/types/Commodity';
import { WithId } from '@/types/WithId';
import { ProductModalContext } from '@/contexts/ProductModalContext';
import { captalizeString } from '@/lib/captalizeString';

export function ProductModal() {
  const [rerender, setRerender] = useState(false);
  const [fetchProductState, setFetchProductState] = useState<FechingState<{
    product: WithId<Product>;
    commodities: WithId<Commodity>[];
  }> | null>(null);

  const context = useContext(ProductModalContext);
  if (!context) {
    throw Error('Missing ProductModalContext');
  }
  const { modalState, setModalState } = context;

  const { isOpen, entityId } = modalState;

  useEffect(() => {
    function cleanStates() {
      setFetchProductState(null);
      setFetchProductState(null);
    }

    async function getProductById() {
      try {
        setFetchProductState({ status: RequestStatus.loading });
        const productPromise = fetchProductById(entityId || '');
        const commoditiesPromise = fetchProductCommodities(entityId || '');
        const [product, commodities] = await Promise.all([productPromise, commoditiesPromise]);
        console.log(product);
        console.log(commodities);
        setFetchProductState({ status: RequestStatus.ok, data: { product, commodities } });
      } catch (error) {
        console.log(error);
        setFetchProductState({ status: RequestStatus.error, message: 'Something went wrong' });
      }
    }

    if (!isOpen) {
      cleanStates();
      return;
    }

    setRerender(false);

    getProductById();
  }, [isOpen, rerender]);

  const productIsLoading = fetchProductState?.status === RequestStatus.loading;
  const product = fetchProductState?.data?.product;

  return (
    isOpen && (
      <BaseModal
        isLoading={productIsLoading}
        close={() => setModalState({ isOpen: false })}
        additionalStyles="h-auto w-[80vw] min-lg:w-[500px]"
      >
        <div className="flex flex-col gap-[24px] justify-center size-full">
          <h1 className="text-2xl">{captalizeString(product?.name || '')}</h1>
          <div className="flex flex-col gap-[16px] text-lg">
            <LabelValue label="code" value={product?.code} />
            <LabelValue label="price" value={product?.price} />
          </div>
          <div className="flex flex-col gap-[16px]">
            <ProductCommoditiesList
              setRerender={setRerender}
              commodities={fetchProductState?.data?.commodities || []}
            />
          </div>
        </div>
      </BaseModal>
    )
  );
}
