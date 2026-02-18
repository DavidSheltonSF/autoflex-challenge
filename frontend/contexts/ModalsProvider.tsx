'use client';
import { ReactNode } from 'react';
import { ProductModalsProvider } from './ProductModalsProvider';
import { CommodityModalsProvider } from './commodities/CommodityModalsProvider';

interface Props {
  children: ReactNode;
}

export function ModalsProvider({ children }: Props) {
  return (
    <CommodityModalsProvider>
      <ProductModalsProvider>{children}</ProductModalsProvider>
    </CommodityModalsProvider>
  );
}
