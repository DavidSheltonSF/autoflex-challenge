export async function fetchAddProductCommodity(
  productId: string,
  commodityId: string,
  quantity: number
) {
  const response = await fetch(`http://localhost:3002/products/${productId}/commodities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commodityId, quantity }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }

  const json = await response.json();
  return json.data;
}
