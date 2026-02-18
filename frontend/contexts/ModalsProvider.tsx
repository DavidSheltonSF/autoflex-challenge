'use client';
import { ReactNode, useState } from 'react';
import { AddProductModalContext } from './AddProductModalContext';
import { DeleteProductModalContext } from './DeleteProductModalContext';
import { UpdateProductModalContext } from './UpdateProductModalContext';

interface Props {
  children: ReactNode;
}

export function ModalsProvider({ children }: Props) {
  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [productIdToDelete, setPRoductIdToDelete] = useState<string | null>(null);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState<string | null>(null);

  return (
    <UpdateProductModalContext value={{isOpen: updateModalIsOpen, setIsOpen: setUpdateModalIsOpen, productId: productIdToUpdate, setProductId: setProductIdToUpdate}}>
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
    </UpdateProductModalContext>
  );
}
