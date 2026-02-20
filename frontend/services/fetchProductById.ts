import { API_URL } from '@/config/api';
import { Product } from '@/types/Product';
import { WithId } from '@/types/WithId';

export async function fetchProductById(id: string): Promise<WithId<Product>> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();
  return json.data;
}
