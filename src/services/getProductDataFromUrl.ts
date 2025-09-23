import { api } from '@/lib/api';

type Response = {
    data: {
        title: string;
        price: number;
        photoUrl: string;
        link: string;
    };
    message: string;
};

export async function getProductDataFromUrl(url: string) {
    const response = await api.get<Response>('/scrape', {
        params: { url },
    });

    return response.data.data;
}
