'use client';
import { ReactNode, useState } from 'react';
import { AddProductModalContext } from './AddProductModalContext';
import { DeleteProductModalContext } from './DeleteProductModalContext';

interface Props {
  children: ReactNode;
}

export function ModalsProvider({ children }: Props) {
  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [productIdToDelete, setPRoductIdToDelete] = useState<string | null>(null);

  return (
    <DeleteProductModalContext
      value={{
        isOpen: deleteModalIsOpen,
        setIsOpen: setDeleteModalIsOpen,
        productId: productIdToDelete,
        setProductId: setPRoductIdToDelete,
      }}
    >
      <AddProductModalContext
        value={{ isOpen: addProductModalIsOpen, setIsOpen: setAddProductModalIsOpen }}
      >
        {children}
      </AddProductModalContext>
    </DeleteProductModalContext>
  );
}
