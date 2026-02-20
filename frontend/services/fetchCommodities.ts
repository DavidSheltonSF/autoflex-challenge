import { API_URL } from '@/config/api';
import { Commodity } from '@/types/Commodity';
import { WithId } from '@/types/WithId';

export async function fetchCommodities(): Promise<WithId<Commodity>[]> {
  const response = await fetch(`${API_URL}/commodities`);

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();

  return json.data;
}
