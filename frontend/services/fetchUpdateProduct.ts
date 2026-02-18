export async function fetchUpdateProduct(id: string, formData: FormData) {
  const code = formData.get('code');
  const name = formData.get('name');
  const price = formData.get('price');
  const quantity = formData.get('quantity');

  const response = await fetch(`http://localhost:3002/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, name, price, quantity }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();
  return json.data;
}
