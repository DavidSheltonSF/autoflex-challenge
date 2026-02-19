'use client';
import { ReactNode, useState } from 'react';
import { AddProductModalContext } from './AddProductModalContext';
import { DeleteProductModalContext } from './DeleteProductModalContext';
import { UpdateProductModalContext } from './UpdateProductModalContext';
import { ModalState } from '@/types/ModalState';
import { ProductModalContext } from './ProductModalContext';

interface Props {
  children: ReactNode;
}

export function ProductModalsProvider({ children }: Props) {
  const [addModalState, setAddModalState] = useState<ModalState>({ isOpen: false });
  const [deleteModalState, setDeleteModalState] = useState<ModalState>({
    isOpen: false,
  });
  const [updateModalState, setUpdateModalState] = useState<ModalState>({
    isOpen: false,
  });

  const [productModalState, setProductModalState] = useState<ModalState>({
    isOpen: false,
  });
  return (
    <ProductModalContext
      value={{ modalState: productModalState, setModalState: setProductModalState }}
    >
      <UpdateProductModalContext
        value={{
          modalState: updateModalState,
          setModalState: setUpdateModalState,
        }}
      >
        <DeleteProductModalContext
          value={{
            modalState: deleteModalState,
            setModalState: setDeleteModalState,
          }}
        >
          <AddProductModalContext
            value={{ modalState: addModalState, setModalState: setAddModalState }}
          >
            {children}
          </AddProductModalContext>
        </DeleteProductModalContext>
      </UpdateProductModalContext>
    </ProductModalContext>
  );
}
