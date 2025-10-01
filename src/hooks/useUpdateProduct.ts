import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProduct } from '@/services/updateProduct';

type UpdateParams = {
    url: string;
    productId: string;
};

type UseUpdateProductOptions = {
    onMutate?: (variables: UpdateParams) => void;
    onSettled?: () => void;
};

export function useUpdateProduct(options?: UseUpdateProductOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ url, productId }: UpdateParams) => updateProduct(url, productId),
        onMutate: options?.onMutate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['products'] });

            Swal.fire({
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
        onSettled: options?.onSettled,
    });
}
