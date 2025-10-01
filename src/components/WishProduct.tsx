import { LoaderCircle, RefreshCw, Trash } from 'lucide-react';
import { Button } from './ui/button';

interface WishProductProps {
    id: string;
    title: string;
    price: number;
    formattedPrice: string;
    link: string;
    image: string;
    onDeleteProduct: (id: string) => void;
    isDeletingProduct: boolean;
    onUpdateProduct: ({ productId, url }: { productId: string; url: string }) => void;
    isUpdatingProduct: boolean;
}

export function WishProduct({
    id,
    title,
    formattedPrice,
    link,
    image,
    onDeleteProduct,
    isDeletingProduct,
    onUpdateProduct,
    isUpdatingProduct,
}: WishProductProps) {
    return (
        <div key={id} className="product flex border rounded-sm overflow-hidden">
            <div className="product-image min-w-[180px] w-[180px] max-h-[140px]">
                <img src={image} alt={title} className="object-cover w-full h-full" />
            </div>

            <div className="product-info flex flex-col justify-center gap-2 pl-6">
                <p className="max-w-md truncate inline-block">
                    <span className="font-semibold">Título:</span> <span>{title}</span>
                </p>

                <p className="max-w-md truncate inline-block">
                    <span className="font-semibold">Link do produto:</span>{' '}
                    <a
                        href={link}
                        target="_blank"
                        className="text-blue-500 hover:underline">
                        {link}
                    </a>
                </p>

                <p>
                    <span className="font-semibold">Preço:</span>{' '}
                    <span>{formattedPrice}</span>
                </p>
            </div>

            <div className="flex flex-col justify-center items-end flex-1 gap-4 pr-6">
                <Button
                    variant="outline"
                    onClick={() => {
                        console.log('Atualizando produto', id);
                        onUpdateProduct({ productId: id, url: link });
                    }}
                    disabled={isDeletingProduct || isUpdatingProduct}
                    title="Atualizar dados do produto">
                    {isUpdatingProduct ? (
                        <RefreshCw className="animate-spin" />
                    ) : (
                        <RefreshCw />
                    )}
                </Button>

                <Button
                    variant="outline"
                    onClick={() => onDeleteProduct(id)}
                    disabled={isDeletingProduct || isUpdatingProduct}
                    title="Remover produto da lista">
                    {isDeletingProduct ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <Trash />
                    )}
                </Button>
            </div>
        </div>
    );
}
