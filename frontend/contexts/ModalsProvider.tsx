'use client';
import { ReactNode, useState } from 'react';
import { AddProductModalContext } from './AddProductModalContext';

interface Props {
  children: ReactNode;
}

export function ModalsProvider({ children }: Props) {
  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);

  return (
    <AddProductModalContext
      value={{ isOpen: addProductModalIsOpen, setIsOpen: setAddProductModalIsOpen }}
    >
      {children}
    </AddProductModalContext>
  );
}
