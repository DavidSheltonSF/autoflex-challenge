import { CommoditiesSection } from '@/components/dynamicSections/CommoditiesSection';

export default function Commodities() {
  return (
    <div className="flex flex-col min-h-screen items-start justify-start bg-zinc-50 font-sans">
      <div className="size-full justify-center items-center flex-co px-[16px] min-lg:px-[80px] py-[40px]">
        <h1 className="text-3xl font-bold my-[16px] text-black">Commodities</h1>
        <CommoditiesSection />
      </div>
    </div>
  );
}
