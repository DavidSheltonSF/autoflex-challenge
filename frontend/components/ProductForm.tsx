import { Product } from '@/types/Product';

interface Props {
  formAction: (formData: FormData) => void | Promise<void>;
  buttonLabel: string;
  data?: Product | null;
}

export function ProductForm({ formAction, buttonLabel, data }: Props) {
  return (
    <form className="flex flex-col gap-[16px] size-full">
      <div className="flex flex-col min-lg:flex-row gap-[16px]">
        <input
          name="code"
          className="w-full min-lg:w-[116px] border rounded-md py-[4px] px-[8px]"
          placeholder="code"
          maxLength={8}
          defaultValue={data?.code}
        />
        <input
          name="price"
          type="number"
          className="w-full border rounded-md py-[4px] px-[8px]"
          placeholder="price"
          defaultValue={data?.price}
        />
      </div>

      <input
        name="name"
        className="w-full border rounded-md py-[4px] px-[8px]"
        placeholder="name"
        defaultValue={data?.name}
      />
      <button
        formAction={formAction}
        className="w-full min-lg:w-[156px] min-lg:ml-auto bg-color-primary text-color-white py-[4px] rounded-md cursor-pointer"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
