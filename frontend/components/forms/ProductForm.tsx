import { Product } from '@/types/Product';
import { Input } from '../Input';

interface Props {
  formAction: (formData: FormData) => void | Promise<void>;
  buttonLabel: string;
  data?: Product | null;
}

export function ProductForm({ formAction, buttonLabel, data }: Props) {
  return (
    <form className="flex flex-col gap-[16px] size-full">
      <div className="flex flex-col min-lg:flex-row gap-[16px]">
        <Input name="code" placeholder="code" maxLength={8} defaultValue={data?.code} />
        <Input name="price" placeholder="price" type="number" step="0.01" defaultValue={String(data?.price)} />
      </div>
      <Input name="name" placeholder="name" defaultValue={data?.name} />
      <button
        formAction={formAction}
        className="w-full min-lg:w-[156px] min-lg:ml-auto bg-color-primary text-color-white py-[4px] rounded-md cursor-pointer"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
