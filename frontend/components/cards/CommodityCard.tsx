import { EditIcon } from '../icons/EditIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { LabelValue } from '../LabelValue';
import { useContext } from 'react';
import { DeleteCommodityModalContext } from '@/contexts/commodities/DeleteCommodityModalContext';
import { UpdateCommodityModalContext } from '@/contexts/commodities/UpdateCommodityModalContext';

interface Props {
  id: string;
  code: string;
  name: string;
  quantity: number;
}

export function CommodityCard({ id, code, name, quantity }: Props) {
  const deleteModalContext = useContext(DeleteCommodityModalContext);
  if (!deleteModalContext) {
    throw Error('Missing AddCommodityModalContext');
  }

  const updateModalContext = useContext(UpdateCommodityModalContext);
  if (!updateModalContext) {
    throw Error('Missing UpdateCommodityModalContext');
  }

  const setDeleteModalState = deleteModalContext.setModalState;
  const setUpdateModalState = updateModalContext.setModalState;

  return (
    <article className="flex flex-col gap-[16px] w-full min-lg:w-[400px] wbg-white border border-black/80 p-[16px] rounded-lg">
      <header className="flex justify-between">
        <h1 className="text-2xl">{name}</h1>
        <div className="flex gap-[16px]">
          <button
            className="cursor-pointer"
            onClick={() => {
              setUpdateModalState({ isOpen: true, entityId: id });
            }}
          >
            <EditIcon width="32px" height="32px" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => {
              setDeleteModalState({ isOpen: true, entityId: id });
            }}
          >
            <TrashIcon width="32px" height="32px" />
          </button>
        </div>
      </header>
      <div className="flex flex-col gap-[8px] text-lg">
        <LabelValue label="code" value={code} />
        <LabelValue label="quantity" value={quantity} />
        <div className="flex flex-col gap-[8px] min-lg:flex-row justify-between"></div>
      </div>
    </article>
  );
}
