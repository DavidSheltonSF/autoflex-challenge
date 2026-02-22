'use client';
import { addProduct } from '@/actions/addProduct';
import { BaseModal } from './BaseModal';
import { useContext, useEffect, useState } from 'react';
import { FechingState } from '@/types/FechingState';
import { AddProductModalContext } from '@/contexts/AddProductModalContext';
import { ProductForm } from '../forms/ProductForm';

export function AddProductModal() {
  const [formState, setFormState] = useState<FechingState<null> | null>(null);

  const context = useContext(AddProductModalContext);
  if (!context) {
    throw Error('Missing AddProductModalContext');
  }

  const { modalState, setModalState } = context;
  const { isOpen } = modalState;

  async function handleSubmit(formData: FormData) {
    setFormState(await addProduct(formData));
  }

  useEffect(() => {
    function cleanStates() {
      setFormState(null);
    }

    if (!isOpen) {
      cleanStates();
    }
  }, [isOpen]);

  return (
    isOpen && (
      <BaseModal
        close={() => setModalState({ isOpen: false })}
        additionalStyles="h-auto w-[90vw] min-md:w-[400px]"
      >
        <div className="flex flex-col gap-[16px] justify-center size-full">
          {formState && (
            <span className="w-full text-center font-bold">
              <p className={formState.status === 'error' ? 'text-red-500' : 'text-green-500'}>
                {formState.message}
              </p>
            </span>
          )}
          <ProductForm formAction={handleSubmit} buttonLabel="Add Product" />
        </div>
      </BaseModal>
    )
  );
}
