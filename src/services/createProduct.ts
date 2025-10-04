import { api } from '@/lib/api';

import { getProductDataFromUrl } from './getProductDataFromUrl';

type Response = {
    message: string;
    data: {
        id: string;
        title: string;
        price: number;
        formattedPrice: string;
        photoUrl: string;
        link: string;
        createdAt: string;
        updatedAt: string;
    };
};

export async function createProduct(url: string) {
    const product = await getProductDataFromUrl(url);
    const response = await api.post<Response>('/products', product);

    return response.data;
}
