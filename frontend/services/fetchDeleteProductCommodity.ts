import { API_URL } from "@/config/api";

export async function fetchDeleteProductCommodity(
  productId: string,
  commodityId: string
): Promise<void> {
  const response = await fetch(`${API_URL}/products/${productId}/commodities/${commodityId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw Error(errorText);
  }
}
