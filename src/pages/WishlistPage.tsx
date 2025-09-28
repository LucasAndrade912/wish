import { type FormEvent, useRef, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WishProduct } from '@/components/WishProduct';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useAddProduct } from '@/hooks/useAddProduct';
import { useGetProducts } from '@/hooks/useGetProducts';
import placeholderImg from '../assets/placeholder-img.png';

const supportedDomains = ['pt.aliexpress.com'];

export function WishlistPage() {
    const addProductFormRef = useRef<HTMLFormElement | null>(null);
    const { data: response, isLoading } = useGetProducts();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams((searchParams) => {
            searchParams.set('page', '1');
            return searchParams;
        });
    }, []);

    const { mutate, isPending } = useAddProduct({
        onAddProduct: () => addProductFormRef.current?.reset(),
    });

    function handleScrapeFromUrl(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const url = formData.get('link')?.toString().trim() ?? '';
        mutate(url);
    }

    function handlePageChange(newPage: number) {
        setSearchParams((searchParams) => {
            searchParams.set('page', newPage.toString());
            return searchParams;
        });
    }

    function renderPaginationItems() {
        if (!response) return null;

        const currentPage = Number(searchParams.get('page')) || 1;
        const totalPages = response.totalPages;
        const items = [];

        // Se há 7 ou menos páginas, mostra todas
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={currentPage === i}
                            onClick={() => handlePageChange(i)}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
            return items;
        }

        // Sempre mostra a primeira página
        items.push(
            <PaginationItem key={1}>
                <PaginationLink
                    isActive={currentPage === 1}
                    onClick={() => handlePageChange(1)}>
                    1
                </PaginationLink>
            </PaginationItem>
        );

        // Se a página atual está longe do início, mostra ellipsis
        if (currentPage > 4) {
            items.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Mostra páginas ao redor da atual
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={currentPage === i}
                        onClick={() => handlePageChange(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Se a página atual está longe do final, mostra ellipsis
        if (currentPage < totalPages - 3) {
            items.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Sempre mostra a última página
        if (totalPages > 1) {
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        isActive={currentPage === totalPages}
                        onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    }

    function handlePrevious() {
        const currentPage = Number(searchParams.get('page')) || 1;
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    }

    function handleNext() {
        const currentPage = Number(searchParams.get('page')) || 1;
        if (response && currentPage < response.totalPages) {
            handlePageChange(currentPage + 1);
        }
    }

    return (
        <main>
            <p className="text-center mb-3 text-sm text-gray-700">
                Domínios suportados para busca automática de informações:{' '}
                {supportedDomains.map((domain) => (
                    <strong key={domain}>{domain}</strong>
                ))}
            </p>

            <form
                onSubmit={handleScrapeFromUrl}
                ref={addProductFormRef}
                className="flex items-end gap-6 justify-center">
                <Input
                    type="url"
                    id="link"
                    name="link"
                    placeholder="Informe o link do produto que será adicionado"
                    className="w-[428px]"
                />

                <Button className="w-[144px]">
                    {isPending ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        'Adicionar na lista'
                    )}
                </Button>
            </form>

            {isLoading && (
                <div className="flex justify-center mt-10">
                    <LoaderCircle className="animate-spin" />
                </div>
            )}

            {response && response.data.length === 0 && !isLoading && (
                <p className="text-center mt-10 text-gray-700">
                    Nenhum produto adicionado ainda.
                </p>
            )}

            {response && response.data.length > 0 && !isLoading && (
                <>
                    <div
                        id="wishlist"
                        className="mt-10 mx-auto w-[800px] flex flex-col gap-3">
                        {response?.data.map((product) => {
                            const image = product.photoUrl ?? placeholderImg;
                            return (
                                <WishProduct
                                    key={product.id}
                                    {...product}
                                    image={image}
                                />
                            );
                        })}
                    </div>

                    <Pagination className="mt-10">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={handlePrevious}
                                    className={
                                        Number(searchParams.get('page')) <= 1
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer'
                                    }
                                />
                            </PaginationItem>

                            {renderPaginationItems()}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={handleNext}
                                    className={
                                        Number(searchParams.get('page')) >=
                                        response.totalPages
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer'
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            )}
        </main>
    );
}
