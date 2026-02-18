'use client';
import { addCommodity } from '@/actions/addCommodity';
import { BaseModal } from './BaseModal';
import { useContext, useEffect, useState } from 'react';
import { FechingState } from '@/types/FechingState';
import { AddCommodityModalContext } from '@/contexts/commodities/AddCommodityModalContext';
import { CommodityForm } from '../CommodityForm';

export function AddCommodityModal() {
  const [formState, setFormState] = useState<FechingState<null> | null>(null);

  const context = useContext(AddCommodityModalContext);
  if (!context) {
    throw Error('Missing AddCommodityModalContext');
  }

  const { modalState, setModalState } = context;
  const { isOpen } = modalState;

  async function handleSubmit(formData: FormData) {
    setFormState(await addCommodity(formData));
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
        additionalStyles="h-auto w-[80vw] min-lg:w-[400px]"
      >
        <div className="flex flex-col gap-[16px] justify-center size-full">
          {formState && (
            <span className="w-full text-center font-bold">
              <p className={formState.status === 'error' ? 'text-red-500' : 'text-green-500'}>
                {formState.message}
              </p>
            </span>
          )}
          <CommodityForm formAction={handleSubmit} buttonLabel="Add Commodity" />
        </div>
      </BaseModal>
    )
  );
}
