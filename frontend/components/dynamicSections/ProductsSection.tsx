import { products } from "@/fakeData/products";
import { ProductsList } from "../ProductsList";

export function ProductsSection() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <div className="flex h-[40px] w-full bg-white rounded-xl border">
          <input className="w-full px-[8px]" type="text" placeholder="Search for a product..." />
        </div>
      </div>
      <ProductsList products={products}/>
    </div>
  );
}
