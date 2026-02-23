'use client';
import { ReactNode, useState } from 'react';
import { RerenderItemsContext } from './RerenderItemsContext';

interface Props {
  children: ReactNode;
}

export function RerenderItemsProvider({ children }: Props) {
  const [renderItems, setRenderItems] = useState(false);
  return (
    <RerenderItemsContext value={{ renderItems, setRenderItems }}>{children}</RerenderItemsContext>
  );
}
