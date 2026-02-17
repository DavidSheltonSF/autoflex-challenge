'use client';
import { Product } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { AddButton } from './AddButton';
import { AddProductModalContext } from '@/contexts/AddProductModalContext';
import { useContext } from 'react';
import { AddProductModal } from './modals/AddProductModal';
import { ProductCardSkelton } from './ProductCardSkeleton';

interface Props {
  products: Product[];
  isLoading: boolean;
}

export function ProductsList({ products, isLoading }: Props) {
  const renderProducts = products.map((product, index) => {
    return <ProductCard key={index} {...product} />;
  });

  const renderSkeleton = () => {
    const skeletons = [];

    for (let i = 0; i < 4; i++) {
      skeletons.push(<ProductCardSkelton key={i} />);
    }

    return skeletons;
  };

  const context = useContext(AddProductModalContext);
  if (!context) {
    throw Error('Missing AddProductModalContext');
  }

  const { isOpen, setIsOpen } = context;

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <AddButton
        label="Add new Product"
        width="180px"
        onClick={() => {
          setIsOpen(!isOpen);
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
