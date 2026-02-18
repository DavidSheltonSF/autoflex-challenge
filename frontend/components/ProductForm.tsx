import { Product } from '@/types/Product';

interface Props {
  formAction: (formData: FormData) => void | Promise<void>;
  buttonLabel: string;
  data?: Product | null;
}

export function ProductForm({ formAction, buttonLabel, data }: Props) {
  return (
    <form className="flex flex-col gap-[16px] size-full">
      <input
        name="code"
        className="w-full min-lg:w-[116px] border rounded-md py-[4px] px-[8px]"
        placeholder="code"
        maxLength={8}
        value={data?.code}
      />
      <input
        name="name"
        className="w-full border rounded-md py-[4px] px-[8px]"
        placeholder="name"
        value={data?.name}
      />
      <div className="flex flex-col min-lg:flex-row gap-[16px]">
        <input
          name="price"
          type="number"
          className="w-full border rounded-md py-[4px] px-[8px]"
          placeholder="price"
          value={data?.price}
        />
        <input
          name="quantity"
          type="number"
          className="w-full border rounded-md py-[4px] px-[8px]"
          placeholder="quantity"
          value={data?.quantity}
        />
      </div>
      <button
        formAction={formAction}
        className="w-full min-lg:w-[156px] min-lg:ml-auto bg-color-primary text-color-white py-[4px] rounded-md cursor-pointer"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
