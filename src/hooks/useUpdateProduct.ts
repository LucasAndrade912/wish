import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProduct } from '@/services/updateProduct';

type UpdateParams = {
    url: string;
    productId: string;
};

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ url, productId }: UpdateParams) => updateProduct(url, productId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['products'] });

            await Swal.fire({
                title: 'Produto atualizado!',
                icon: 'success',
            });
        },
        onError: (error) => {
            Swal.fire({
                title: 'Erro ao atualizar produto',
                text: error.message,
                icon: 'error',
            });
        },
    });
}
