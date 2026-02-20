import { API_URL } from "@/config/api";

export async function fetchDeleteCommodity(id: string) {
  const response = await fetch(`${API_URL}/commodities/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();
  return json.data;
}
