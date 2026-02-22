'use client';
import { BaseModal } from './BaseModal';
import { useContext, useEffect, useState } from 'react';
import { FechingState } from '@/types/FechingState';
import { ProductForm } from '../forms/ProductForm';
import { UpdateProductModalContext } from '@/contexts/UpdateProductModalContext';
import { Product } from '@/types/Product';
import { fetchProductById } from '@/services/fetchProductById';
import { RequestStatus } from '@/types/RequestStatus';
import { fetchUpdateProduct } from '@/services/fetchUpdateProduct';

export function UpdateProductModal() {
  const [fetchProductState, setFetchProductState] = useState<FechingState<Product> | null>(null);

  const context = useContext(UpdateProductModalContext);
  if (!context) {
    throw Error('Missing UpdateProductModalContext');
  }
  const { modalState, setModalState } = context;

  const { isOpen, entityId } = modalState;

  useEffect(() => {
    function cleanStates() {
      setFetchProductState(null);
      setFetchProductState(null);
    }

    async function getProductById() {
      try {
        setFetchProductState({ status: RequestStatus.loading });
        const product = await fetchProductById(entityId || '');
        setFetchProductState({ status: RequestStatus.ok, data: product });
      } catch (error) {
        console.log(error);
        setFetchProductState({ status: RequestStatus.error, message: 'Something went wrong' });
      }
    }

    if (!isOpen) {
      cleanStates();
      return;
    }

    getProductById();
  }, [isOpen]);

  async function handleSubmit(formData: FormData) {
    try {
      setFetchProductState({ status: RequestStatus.loading });
      const updatedProduct = await fetchUpdateProduct(entityId || '', formData);
      setFetchProductState({
        status: RequestStatus.ok,
        data: updatedProduct,
        message: 'Product updated succesfuly',
      });
    } catch (error) {
      console.log(error);
      setFetchProductState({ status: RequestStatus.error, message: 'Something went wrong' });
    }
  }

  const productIsLoading = fetchProductState?.status === RequestStatus.loading;

  return (
    isOpen && (
      <BaseModal
        isLoading={productIsLoading}
        close={() => setModalState({ isOpen: false })}
        additionalStyles="h-auto w-[90vw] min-md:w-[400px]"
      >
        <div className="flex flex-col gap-[16px] justify-center size-full">
          {fetchProductState && (
            <span className="w-full text-center font-bold">
              <p
                className={fetchProductState.status === 'error' ? 'text-red-500' : 'text-green-500'}
              >
                {fetchProductState.message}
              </p>
            </span>
          )}
          <ProductForm
            data={fetchProductState?.data}
            formAction={handleSubmit}
            buttonLabel="Edit Product"
          />
        </div>
      </BaseModal>
    )
  );
}
