import { API_URL } from '@/config/api';

export async function fetchUpdateProduct(id: string, formData: FormData) {
  const code = formData.get('code');
  const name = formData.get('name');
  const price = formData.get('price');

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, name, price }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();
  return json.data;
}
