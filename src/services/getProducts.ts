import { api } from '@/lib/api';

type Pagination = {
    page: number;
    limit: number;
};

type Response = {
    data: {
        id: string;
        title: string;
        price: number;
        formattedPrice: string;
        photoUrl: string;
        link: string;
        createdAt: string;
        updatedAt: string;
    }[];
    message: string;
    totalRecords: number;
    totalPages: number;
};

export async function getProducts({ page = 0, limit = 10 }: Pagination) {
    const response = await api.get<Response>('/products', {
        params: {
            page,
            limit,
        },
    });

    return response.data;
}
