import { type FormEvent, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WishProduct } from '@/components/WishProduct';
import { useAddProduct } from '@/hooks/useAddProduct';
import placeholderImg from '../assets/placeholder-img.png';
import { LoaderCircle } from 'lucide-react';

const MOCK_DATA = [
    {
        id: 1,
        title: 'Computador Gamer',
        price: 5000,
        link: 'https://www.exemplo.com/produto',
        image: placeholderImg,
    },
    {
        id: 2,
        title: 'Console de Videogame',
        price: 3000,
        link: 'https://www.exemplo.com/produto2',
        image: placeholderImg,
    },
    {
        id: 3,
        title: 'Teclado Mecânico',
        price: 500,
        link: 'https://www.exemplo.com/produto3',
        image: placeholderImg,
    },
];

const supportedDomains = ['pt.aliexpress.com'];

export function WishlistPage() {
    const addProductFormRef = useRef<HTMLFormElement | null>(null);

    const { mutate, isPending } = useAddProduct({
        onAddProduct: () => addProductFormRef.current?.reset(),
    });

    function handleScrapeFromUrl(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const url = formData.get('link')?.toString().trim() ?? '';
        mutate(url);
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

            <div id="wishlist" className="mt-10 mx-auto w-[800px] flex flex-col gap-3">
                {MOCK_DATA.map((product) => (
                    <WishProduct key={product.id} {...product} />
                ))}
            </div>
        </main>
    );
}
