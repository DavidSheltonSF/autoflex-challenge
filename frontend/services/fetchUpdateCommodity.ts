import { API_URL } from "@/config/api";

export async function fetchUpdateCommodity(id: string, formData: FormData) {
  const code = formData.get('code');
  const name = formData.get('name');
  const quantity = formData.get('quantity');

  const response = await fetch(`${API_URL}/commodities/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, name, quantity }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();
  return json.data;
}
