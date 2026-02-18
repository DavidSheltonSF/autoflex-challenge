import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContext } from './ModalContext';

export const UpdateProductModalContext = createContext<
  | (ModalContext & {
      productId: string | null;
      setProductId: Dispatch<SetStateAction<string | null>>;
    })
  | null
>(null);
