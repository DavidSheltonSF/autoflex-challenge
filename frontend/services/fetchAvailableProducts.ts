import { API_URL } from '@/config/api';
import { Product } from '@/types/Product';
import { WithId } from '@/types/WithId';

export async function fetchAvailableProducts(): Promise<WithId<Product & { quantity: number }>[]> {
  const response = await fetch(`${API_URL}/availableProducts`);

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();
  return json.data;
}
