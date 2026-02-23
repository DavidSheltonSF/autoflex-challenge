import { createContext, Dispatch, SetStateAction } from 'react';

export const RerenderItemsContext = createContext<{
  renderItems: boolean;
  setRenderItems: Dispatch<SetStateAction<boolean>>;
} | null>(null);
