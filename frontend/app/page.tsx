import { CommoditiesSection } from '@/components/dynamicSections/CommoditiesSection';
import { ProductsSection } from '@/components/dynamicSections/ProductsSection';
import { DynamicSections } from '@/components/DynamicSections';

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-start bg-zinc-50 font-sans">
      <main className="flex flex-col justify-start item-start size-full">
        <div className="flex justify-center items-start w-full min-h-[90vh] py-[16px]">
          <DynamicSections sectionsTitles={['products', 'commodities']}>
            <div className="size-full">
              <ProductsSection />
            </div>
            <div>
              <CommoditiesSection />
            </div>
          </DynamicSections>
        </div>
        <aside className="bg-red-200 w-full h-[30vh]"></aside>
      </main>
    </div>
  );
}
