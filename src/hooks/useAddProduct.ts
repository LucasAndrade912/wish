import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';

import { createProduct } from '@/services/createProduct';

export function useAddProduct() {
    return useMutation({
        mutationFn: (url: string) => createProduct(url),
        onSuccess: () => {
            Swal.fire({
                title: 'Produto adicionado!',
                icon: 'success',
            });
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
