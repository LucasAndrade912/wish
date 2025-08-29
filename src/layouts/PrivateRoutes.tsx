import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Outlet } from 'react-router';

export function PrivateRoutes() {
    return (
        <main className="w-full py-8 px-12">
            <header className="mb-10 w-full flex justify-between">
                <h1 className="text-2xl font-medium">
                    <a href="/">Wish</a>
                </h1>

                <Button variant="outline" className="cursor-pointer">
                    <LogOut /> Sair
                </Button>
            </header>

            <Outlet />

            <footer className="mt-10 w-full text-center">
                Desenvolvido por Lucas Andrade |{' '}
                <a
                    href="https://github.com/lucasandrade912"
                    target="_blank"
                    className="text-blue-700">
                    GitHub
                </a>{' '}
                |{' '}
                <a
                    href="https://www.linkedin.com/in/lucasandrade912"
                    target="_blank"
                    className="text-blue-700">
                    LinkedIn
                </a>
            </footer>
        </main>
    );
}
