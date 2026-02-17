'use client';
import { addProduct } from '@/actions/addProduct';
import { BaseModal } from './BaseModal';
import { useContext, useEffect, useState } from 'react';
import { FechingState } from '@/types/FechingState';
import { AddProductModalContext } from '@/contexts/AddProductModalContext';

export function AddProductModal() {
  const [formState, setFormState] = useState<FormState | null>(null);

  const context = useContext(AddProductModalContext);
  if (!context) {
    throw Error('Missing AddProductModalContext');
  }
  const { isOpen } = context;

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
    <BaseModal height="auto" width="80vw">
      <div className="flex flex-col gap-[16px] justify-center size-full">
        {formState && (
          <span className="w-full text-center font-bold">
            <p className={formState.status === 'error' ? 'text-red-500' : 'text-green-500'}>
              {formState.message}
            </p>
          </span>
        )}
        <form className="flex flex-col gap-[16px] size-full">
          <input
            name="code"
            className="w-full border rounded-md py-[4px] px-[8px]"
            placeholder="code"
          />
          <input
            name="name"
            className="w-full border rounded-md py-[4px] px-[8px]"
            placeholder="name"
          />
          <input
            name="price"
            type="number"
            className="w-full border rounded-md py-[4px] px-[8px]"
            placeholder="price"
          />
          <input
            name="quantity"
            type="number"
            className="w-full border rounded-md py-[4px] px-[8px]"
            placeholder="quantity"
          />
          <button
            formAction={handleSubmit}
            className="w-full bg-color-primary text-color-white py-[4px] rounded-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </BaseModal>
  );
}
