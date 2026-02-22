'use client';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { WithId } from '@/types/WithId';
import { Commodity } from '@/types/Commodity';
import { ProductCommodityCard } from '../cards/ProductCommodityCard';
import { fetchAddProductCommodity } from '@/services/fetchAddProductCommodity';
import { ProductModalContext } from '@/contexts/ProductModalContext';
import { ProductCommoditiesSearchBar } from '../ProductCommoditiesSearchBar';
import { Button } from '../buttons/Button';
import { Input } from '../Input';

interface Props {
  commodities: WithId<Commodity>[];
  setRerender: Dispatch<SetStateAction<boolean>>;
}

export function ProductCommoditiesList({ commodities, setRerender }: Props) {
  const [commodityId, setCommodityId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>('1');

  const productModalContext = useContext(ProductModalContext);
  if (!productModalContext) {
    throw Error('Missing ProductModalContext');
  }

  const productId = productModalContext.modalState.entityId;

  function addCommodity() {
    try {
      fetchAddProductCommodity(productId || '', commodityId || '', Number(quantity));
      setRerender(true);
    } catch (error) {
      console.log(error);
    }
  }

  const renderProducts = commodities.map((commodities, index) => {
    return <ProductCommodityCard setRerender={setRerender} key={index} {...commodities} />;
  });

  const readyToSubmit = commodityId && Number(quantity) > 0;

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <div className="flex flex-col gap-[16px] py-[8px] border-t border-black/30">
        <h1 className="text-2xl">Commodities</h1>
        <div className="flex flex-col min-md:flex-row gap-[16px] min-md:gap-[8px]">
          <span>
            <ProductCommoditiesSearchBar width={"100%"} setCommodityId={setCommodityId} />
          </span>
          <span>
            <Input
              width="100%"
              height='32px'
              type="number"
              defaultValue={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </span>
          <span className='w-full min-md:w-[100px]'>
            <Button
              backgroundColor={readyToSubmit ? 'var(--color-primary)' : 'gray'}
              color="var(--color-white)"
              label="Add"
              width="100%"
              height="32px"
              disabled={!readyToSubmit}
              onClick={addCommodity}
            />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[24px]">{renderProducts}</div>
    </div>
  );
}
