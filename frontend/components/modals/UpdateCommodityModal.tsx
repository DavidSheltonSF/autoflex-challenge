'use client';
import { BaseModal } from './BaseModal';
import { useContext, useEffect, useState } from 'react';
import { FechingState } from '@/types/FechingState';
import { CommodityForm } from '../forms/CommodityForm';
import { UpdateCommodityModalContext } from '@/contexts/commodities/UpdateCommodityModalContext';
import { Commodity } from '@/types/Commodity';
import { fetchAddCommodity } from '@/services/fetchAddCommodity';
import { RequestStatus } from '@/types/RequestStatus';
import { fetchUpdateCommodity } from '@/services/fetchUpdateCommodity';
import { fetchCommodityById } from '@/services/fetchCommodityById';
import { WithId } from '@/types/WithId';

export function UpdateCommodityModal() {
  const [fetchCommodityState, setFetchCommodityState] = useState<FechingState<
    WithId<Commodity>
  > | null>(null);

  const context = useContext(UpdateCommodityModalContext);
  if (!context) {
    throw Error('Missing UpdateCommodityModalContext');
  }
  const { modalState, setModalState } = context;

  const { isOpen, entityId } = modalState;

  useEffect(() => {
    function cleanStates() {
      setFetchCommodityState(null);
      setFetchCommodityState(null);
    }

    async function getCommodityById() {
      try {
        setFetchCommodityState({ status: RequestStatus.loading });
        const commodity = await fetchCommodityById(entityId || '');
        console.log(commodity);
        setFetchCommodityState({
          status: RequestStatus.ok,
          data: commodity,
        });
      } catch (error) {
        console.log(error);
        setFetchCommodityState({ status: RequestStatus.error, message: 'Something went wrong' });
      }
    }

    if (!isOpen) {
      cleanStates();
      return;
    }

    getCommodityById();
  }, [isOpen]);

  async function handleSubmit(formData: FormData) {
    try {
      setFetchCommodityState({ status: RequestStatus.loading });
      const updatedCommodity = await fetchUpdateCommodity(entityId || '', formData);
      setFetchCommodityState({
        status: RequestStatus.ok,
        data: updatedCommodity,
        message: 'Commodity updated succesfuly',
      });
    } catch (error) {
      console.log(error);
      setFetchCommodityState({ status: RequestStatus.error, message: 'Something went wrong' });
    }
  }

  const commodityIsLoading = fetchCommodityState?.status === RequestStatus.loading;

  return (
    isOpen && (
      <BaseModal
        isLoading={commodityIsLoading}
        close={() => setModalState({ isOpen: false })}
        additionalStyles="h-auto w-[90vw] min-md:w-[400px]"
      >
        <div className="flex flex-col gap-[16px] justify-center size-full">
          {fetchCommodityState && (
            <span className="w-full text-center font-bold">
              <p
                className={
                  fetchCommodityState.status === 'error' ? 'text-red-500' : 'text-green-500'
                }
              >
                {fetchCommodityState.message}
              </p>
            </span>
          )}
          <CommodityForm
            data={fetchCommodityState?.data}
            formAction={handleSubmit}
            buttonLabel="Edit Commodity"
          />
        </div>
      </BaseModal>
    )
  );
}
