import type { FormEvent } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

export function LoginPage() {
    const { login } = useAuth();

    function handleLogin(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email')?.toString().trim() ?? '';
        const password = formData.get('password')?.toString().trim() ?? '';

        login({ email, password });
    }

    return (
        <main className="w-full h-screen flex items-center justify-center">
            <form className="w-sm" onSubmit={handleLogin}>
                <h1 className="text-xl text-center font-bold mb-6">
                    Bem-vindo de volta! Faça seu login
                </h1>

                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="email">E-mail</Label>

                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Informe o seu e-mail"
                        className="w-full"
                    />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="password">Senha</Label>

                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Informe a sua senha"
                        className="w-full"
                    />
                </div>

                <Button type="submit" className="w-full">
                    Entrar
                </Button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <Link to="/auth/sign-up" className="text-rose-800 font-medium">
                        Cadastre-se
                    </Link>
                </p>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Esqueceu sua senha?{' '}
                    <Link
                        to="/auth/forgot-password"
                        className="text-rose-800 font-medium">
                        Clique aqui
                    </Link>
                </p>
            </form>
        </main>
    );
}
