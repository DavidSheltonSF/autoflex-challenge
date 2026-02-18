'use client';
import { PlusIcon } from '../icons/PlusIcon';

interface Props {
  label: string;
  width?: string;
  height?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function AddButton(Props: Props) {
  const { label, width = 'auto', height = 'auto', onClick } = Props;
  return (
    <button
      className="border bg-color-white pl-[8px] pr-[14px] py-[8px] rounded-lg hover:brightness-96 transition-[filter] duration-300 cursor-pointer"
      onClick={onClick}
      style={{
        width,
        height,
      }}
    >
      <span className="flex">
        <PlusIcon />
        <p>{label}</p>
      </span>
    </button>
  );
}
