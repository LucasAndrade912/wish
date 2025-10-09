import type { FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

export function SignUpPage() {
    const { signUp } = useAuth();

    function handleSignUp(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const name = formData.get('name')?.toString().trim() ?? '';
        const email = formData.get('email')?.toString().trim() ?? '';
        const password = formData.get('password')?.toString().trim() ?? '';

        signUp({ name, email, password });
    }

    return (
        <main className="w-full h-screen flex items-center justify-center">
            <form className="w-sm" onSubmit={handleSignUp}>
                <h1 className="text-xl text-center font-bold mb-6">
                    Bem-vindo! Crie sua conta
                </h1>

                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="name">Nome</Label>

                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Informe o seu nome"
                        className="w-full"
                    />
                </div>

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
                    Cadastrar
                </Button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <a href="/auth/login" className="text-rose-800 font-medium">
                        Faça seu login
                    </a>
                </p>
            </form>
        </main>
    );
}
