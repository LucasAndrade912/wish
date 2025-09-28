import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createProduct } from '@/services/createProduct';

type Props = {
    onAddProduct?: () => void;
};

export function useAddProduct({ onAddProduct }: Props) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (url: string) => createProduct(url),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['products'] });

            await Swal.fire({
                title: 'Produto adicionado!',
                icon: 'success',
            });

            if (onAddProduct) {
                onAddProduct();
            }
        },
        onError: (error) => {
            Swal.fire({
                title: 'Erro ao adicionar produto',
                text: error.message,
                icon: 'error',
            });
        },
    });
}
