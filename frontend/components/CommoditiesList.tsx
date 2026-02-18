'use client';
import { Commodity } from '@/types/Commodity';
import { CommodityCard } from './CommodityCard';
import { AddButton } from './AddButton';
import { useContext } from 'react';
import { CardSkeleton } from './CardSkeleton';
import { AddCommodityModalContext } from '@/contexts/commodities/AddCommodityModalContext';
import { WithId } from '@/types/WithId';

interface Props {
  commodities: WithId<Commodity>[];
  isLoading: boolean;
}

export function CommoditiesList({ commodities, isLoading }: Props) {
  const renderCommodities = commodities.map((commodity, index) => {
    return <CommodityCard key={index} {...commodity} />;
  });

  const renderSkeleton = () => {
    const skeletons = [];

    for (let i = 0; i < 4; i++) {
      skeletons.push(<CardSkeleton key={i} />);
    }

    return skeletons;
  };

  const context = useContext(AddCommodityModalContext);
  if (!context) {
    throw Error('Missing AddCommodityModalContext');
  }

  const { setModalState } = context;

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <AddButton
        label="Add new Commodity"
        width="200px"
        onClick={() => {
          setModalState({ isOpen: true });
        }}
      />
      <div className="flex flex-col gap-[24px]">
        {commodities.length === 0 && (
          <div className="text-2xl text-center">
            <h1>No Commodities where found</h1>
          </div>
        )}
        {isLoading ? renderSkeleton() : renderCommodities}
      </div>
    </div>
  );
}
