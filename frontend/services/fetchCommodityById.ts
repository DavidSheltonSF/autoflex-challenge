import { API_URL } from '@/config/api';
import { Commodity } from '@/types/Commodity';
import { WithId } from '@/types/WithId';

export async function fetchCommodityById(id: string): Promise<WithId<Commodity>> {
  const response = await fetch(`${API_URL}/commodities/${id}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();
  return json.data;
}
