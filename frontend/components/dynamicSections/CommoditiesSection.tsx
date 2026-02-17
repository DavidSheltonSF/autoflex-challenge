import { CommoditiesList } from '../CommoditiesList';
import { commodities } from '@/fakeData/commodities';

export function CommoditiesSection() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <div className="flex h-[40px] w-full bg-white rounded-xl border">
          <input className="w-full px-[8px]" type="text" placeholder="Search for a commodity..." />
        </div>
      </div>
      <CommoditiesList commodities={commodities} />
    </div>
  );
}
