import { api } from '@/lib/api';

import { getProductDataFromUrl } from './getProductDataFromUrl';

export async function createProduct(url: string) {
    const product = await getProductDataFromUrl(url);
    const response = await api.post('/products', product);

    return response.data;
}
