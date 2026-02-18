import { fetchDeleteProductById } from '@/services/fetchDeleteProductById';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { LabelValue } from './LabelValue';
import { DeleteProductModal } from './modals/DeleteProductModal';
import { useContext } from 'react';
import { DeleteProductModalContext } from '@/contexts/DeleteProductModalContext';

interface Props {
  id: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
}

export function ProductCard({ id, code, name, price, quantity }: Props) {
  const deleteModalContext = useContext(DeleteProductModalContext);
  if (!deleteModalContext) {
    throw Error('Missing AddProductModalContext');
  }

  const setDeleteModalIsOpen = deleteModalContext.setIsOpen;

  const setProductIdToDelete = deleteModalContext.setProductId;

  return (
    <article className="flex flex-col gap-[16px] w-full bg-white border border-black/80 p-[16px] rounded-lg">
      <DeleteProductModal message="Are you sure you want to delete this product?" />
      <header className="flex justify-between">
        <h1 className="text-2xl">{name}</h1>
        <div className="flex gap-[16px]">
          <EditIcon width="32px" height="32px" />
          <button
            className="cursor-pointer"
            onClick={() => {
              setProductIdToDelete(id);
              setDeleteModalIsOpen(true);
            }}
          >
            <TrashIcon width="32px" height="32px" />
          </button>
        </div>
      </header>
      <div className="flex flex-col gap-[8px] text-lg">
        <LabelValue label="code" value={code} />
        <LabelValue label="name" value={name} />
        <LabelValue label="price" value={price} />
        <LabelValue label="quantity" value={quantity} />
      </div>
    </article>
  );
}
