import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProduct } from '@/services/deleteProduct';

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['products'] });

            await Swal.fire({
                title: 'Produto removido!',
                icon: 'success',
            });
        },
        onError: (error) => {
            Swal.fire({
                title: 'Erro ao remover produto',
                text: error.message,
                icon: 'error',
            });
        },
    });
}
