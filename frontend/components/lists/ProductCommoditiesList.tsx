'use client';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { WithId } from '@/types/WithId';
import { Commodity } from '@/types/Commodity';
import { ProductCommodityCard } from '../cards/ProductCommodityCard';
import { fetchAddProductCommodity } from '@/services/fetchAddProductCommodity';
import { ProductModalContext } from '@/contexts/ProductModalContext';
import { ProductCommoditiesSearchBar } from '../ProductCommoditiesSearchBar';
import { Button } from '../buttons/Button';

interface Props {
  commodities: WithId<Commodity>[];
  setRerender: Dispatch<SetStateAction<boolean>>;
}

export function ProductCommoditiesList({ commodities, setRerender }: Props) {
  const [commodityId, setCommodityId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>('0');

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

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <div className="flex flex-col gap-[16px] py-[8px] border-t border-black/30">
        <h1 className="text-2xl">Commodities</h1>
        <div className="flex gap-[8px]">
          <ProductCommoditiesSearchBar setCommodityId={setCommodityId} />
          <input
            className="border rounded-md w-[160px] px-[8px]"
            type="number"
            placeholder="quantity"
            defaultValue={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button label="Add" height="auto" onClick={addCommodity} />
        </div>
      </div>

      <div className="flex flex-col gap-[24px]">{renderProducts}</div>
    </div>
  );
}
