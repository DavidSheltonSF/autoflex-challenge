import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

export function CardSkeleton() {
  return (
    <article className="flex flex-col gap-[16px] w-full min-lg:w-[400px] wbg-white border border-black/80 p-[16px] rounded-lg">
      <header className="flex justify-between">
        <span className="h-[32px] w-[100px] bg-gray-300  animate-pulse"></span>
        <div className="flex gap-[16px]">
          <EditIcon width="32px" height="32px" />
          <TrashIcon width="32px" height="32px" />
        </div>
      </header>
      <div className="flex flex-col gap-[8px] text-lg">
        <span className="h-[20px] w-[120px] bg-gray-300 animate-pulse"></span>
        <span className="h-[20px] w-[100px] bg-gray-300 animate-pulse"></span>
        <span className="h-[20px] w-[130px] bg-gray-300 animate-pulse"></span>
        <span className="h-[20px] w-[110px] bg-gray-300 animate-pulse"></span>
      </div>
    </article>
  );
}
