import { Commodity } from '@/types/Commodity';
import { WithId } from '@/types/WithId';

export async function fetchCommodities(): Promise<WithId<Commodity>[]> {
  const response = await fetch('http://localhost:3002/commodities');

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();

  return json.data;
}
