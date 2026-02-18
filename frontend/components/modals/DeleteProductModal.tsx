'use client';
import { useContext, useState } from 'react';
import { BaseModal } from './BaseModal';
import { DeleteProductModalContext } from '@/contexts/DeleteProductModalContext';
import { Button } from '../buttons/Button';
import { fetchDeleteProductById } from '@/services/fetchDeleteProductById';
import { FechingState } from '@/types/FechingState';
import { RequestStatus } from '@/types/RequestStatus';

export function DeleteProductModal() {
  const [feching, setFeching] = useState<FechingState<null> | null>(null);
  const context = useContext(DeleteProductModalContext);
  if (!context) {
    throw Error('Missing AddProductModalContext');
  }
  const { modalState, setModalState } = context;
  const { isOpen, entityId } = modalState;

  const isLoading = feching?.status === RequestStatus.loading ? true : false;

  async function handleDeleteProduct() {
    try {
      setFeching({ status: RequestStatus.loading });
      await fetchDeleteProductById(entityId || '');
      setFeching({ status: RequestStatus.ok, message: `Product deleted successfuly` });
    } catch (error) {
      console.log(error);
      setFeching({ status: RequestStatus.error, message: 'Something went wrong' });
    }
  }

  return (
    isOpen && (
      <BaseModal
        isLoading={isLoading}
        close={() => setModalState({ isOpen: false })}
        additionalStyles="h-[25vh] w-[60vw] min-lg:w-[332px]"
      >
        <div className="flex flex-col  size-full">
          {!feching && (
            <h1 className="text-lg text-center">Are you sure you want to delete this product?</h1>
          )}
          {isLoading ? null : <h1 className="text-lg text-center">{feching?.message}</h1>}
          <div className="flex justify-between items-end size-full">
            <Button
              onClick={() => setModalState({ isOpen: false })}
              backgroundColor="#9e9e9e"
              color="white"
              label="Cancel"
            />
            <Button
              onClick={() => {
                handleDeleteProduct();
              }}
              backgroundColor="#e73737"
              color="white"
            />
          </div>
        </div>
      </BaseModal>
    )
  );
}
