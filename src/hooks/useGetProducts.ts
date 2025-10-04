import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/services/getProducts';

export function useGetProducts() {
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '5');

    return useQuery({
        queryKey: ['products', page, limit],
        queryFn: async () => await getProducts({ page, limit }),
    });
}
