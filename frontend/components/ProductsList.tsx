'use client';
import { Product } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { AddButton } from './AddButton';
import { useContext } from 'react';
import { AddProductModal } from './modals/AddProductModal';
import { CardSkeleton } from './CardSkeleton';
import { AddProductModalContext } from '@/contexts/AddProductModalContext';
import { WithId } from '@/types/WithId';

interface Props {
  products: WithId<Product>[];
  isLoading: boolean;
}

export function ProductsList({ products, isLoading }: Props) {
  const renderProducts = products.map((product, index) => {
    return <ProductCard key={index} {...product} />;
  });

  const renderSkeleton = () => {
    const skeletons = [];

    for (let i = 0; i < 4; i++) {
      skeletons.push(<CardSkeleton key={i} />);
    }

    return skeletons;
  };

  const context = useContext(AddProductModalContext);
  if (!context) {
    throw Error('Missing AddProductModalContext');
  }

  const { setModalState } = context;

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <AddButton
        label="Add new Product"
        width="180px"
        onClick={() => {
          setModalState({ isOpen: true });
        }}
      />
      <AddProductModal />
      <div className="flex flex-col gap-[24px]">
        {products.length === 0 && (
          <div className="text-2xl text-center">
            <h1>No products where found</h1>
          </div>
        )}
        {isLoading ? renderSkeleton() : renderProducts}
      </div>
    </div>
  );
}
