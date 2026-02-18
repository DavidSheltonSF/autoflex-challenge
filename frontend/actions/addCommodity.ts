import { fetchAddCommodity } from '@/services/fetchAddCommodity';
import { FechingState } from '@/types/FechingState';
import { RequestStatus } from '@/types/RequestStatus';

export async function addCommodity(formData: FormData): Promise<FechingState<null>> {
  try {
    const code = formData.get('code');
    const name = formData.get('name');
    const quantity = formData.get('quantity');

    if (!code || !name || !quantity) {
      return { status: RequestStatus.error, message: 'Missing required fields' };
    }

    await fetchAddCommodity(formData);
    return { status: RequestStatus.ok, message: 'Commodity added successfuly' };
  } catch (error) {
    console.log(error);
    return { status: RequestStatus.error, message: 'Something went wrong' };
  }
}
