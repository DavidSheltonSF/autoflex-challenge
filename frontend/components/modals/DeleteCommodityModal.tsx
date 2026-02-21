'use client';
import { useContext, useState } from 'react';
import { BaseModal } from './BaseModal';
import { DeleteCommodityModalContext } from '@/contexts/commodities/DeleteCommodityModalContext';
import { Button } from '../buttons/Button';
import { fetchDeleteCommodity } from '@/services/fetchDeleteCommodity';
import { FechingState } from '@/types/FechingState';
import { RequestStatus } from '@/types/RequestStatus';

export function DeleteCommodityModal() {
  const [feching, setFeching] = useState<FechingState<null> | null>(null);
  const context = useContext(DeleteCommodityModalContext);
  if (!context) {
    throw Error('Missing AddCommodityModalContext');
  }
  const { modalState, setModalState } = context;
  const { isOpen, entityId } = modalState;

  const isLoading = feching?.status === RequestStatus.loading ? true : false;

  async function handleDeleteCommodity() {
    try {
      setFeching({ status: RequestStatus.loading });
      await fetchDeleteCommodity(entityId || '');
      setFeching({ status: RequestStatus.ok, message: `Commodity deleted successfuly` });
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
        additionalStyles="h-[25vh] w-[300px] min-md:w-[336px]"
      >
        <div className="flex flex-col  size-full">
          {!feching && (
            <h1 className="text-lg text-center">Are you sure you want to delete this commodity?</h1>
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
                handleDeleteCommodity();
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
