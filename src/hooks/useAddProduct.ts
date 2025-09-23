import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';

import { createProduct } from '@/services/createProduct';

type Props = {
    onAddProduct?: () => void;
};

export function useAddProduct({ onAddProduct }: Props) {
    return useMutation({
        mutationFn: (url: string) => createProduct(url),
        onSuccess: async () => {
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
