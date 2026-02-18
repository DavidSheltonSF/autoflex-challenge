import { useContext, useState } from 'react';
import { BaseModal } from './BaseModal';
import { DeleteProductModalContext } from '@/contexts/DeleteProductModalContext';
import { Button } from '../Button';
import { fetchDeleteProductById } from '@/services/fetchDeleteProductById';
import { FechingState } from '@/types/FechingState';
import { RequestStatus } from '@/types/RequestStatus';

interface Props {
  message: string;
}

export function DeleteProductModal({ message }: Props) {
  const [feching, setFeching] = useState<FechingState<null> | null>(null);
  const context = useContext(DeleteProductModalContext);
  if (!context) {
    throw Error('Missing AddProductModalContext');
  }
  const { isOpen, setIsOpen, productId } = context;

  const isLoading = feching?.status === RequestStatus.loading ? true : false;

  async function handleDeleteProduct() {
    try {
      setFeching({ status: RequestStatus.loading });
      await fetchDeleteProductById(productId || 0);
      setFeching({ status: RequestStatus.ok, message: `Product deleted successfuly` });
    } catch (error) {
      console.log(error);
      setFeching({ status: RequestStatus.error, message: 'Something went wrong' });
    }
  }

  return (
    isOpen && (
      <BaseModal close={() => setIsOpen(false)} height="25vh" width="60vw">
        <div className="flex flex-col  size-full">
          {!feching && <h1 className="text-lg text-center">{message}</h1>}
          {isLoading ? null : <h1 className="text-lg text-center">{feching?.message}</h1>}
          <div className="flex justify-between items-end size-full">
            <Button
              onClick={() => setIsOpen(false)}
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
