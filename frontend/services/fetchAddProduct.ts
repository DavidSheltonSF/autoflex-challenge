import { API_URL } from "@/config/api";

export async function fetchAddProduct(formData: FormData) {
  const code = formData.get('code');
  const name = formData.get('name');
  const price = formData.get('price');

  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
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
