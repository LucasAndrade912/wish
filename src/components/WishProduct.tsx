import { Pencil, Trash } from 'lucide-react';
import { Button } from './ui/button';

interface WishProductProps {
    id: number;
    title: string;
    price: number;
    link: string;
    image: string;
}

export function WishProduct({ id, title, price, link, image }: WishProductProps) {
    return (
        <div key={id} className="product flex border rounded-sm">
            <div className="product-image">
                <img src={image} alt="Placeholder Image" />
            </div>

            <div className="product-info flex flex-col justify-center gap-2 pl-6">
                <p>
                    <span className="font-semibold">Título:</span> <span>{title}</span>
                </p>

                <p>
                    <span className="font-semibold">Preço:</span>{' '}
                    <span>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(price)}
                    </span>
                </p>

                <p>
                    <span className="font-semibold">Link do produto:</span>{' '}
                    <a
                        href={link}
                        target="_blank"
                        className="text-blue-500 hover:underline">
                        {link}
                    </a>
                </p>
            </div>

            <div className="flex flex-col justify-center items-end flex-1 gap-4 pr-6">
                <Button variant="outline">
                    <Pencil />
                </Button>

                <Button variant="outline">
                    <Trash />
                </Button>
            </div>
        </div>
    );
}
