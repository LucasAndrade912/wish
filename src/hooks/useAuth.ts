import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { loginService } from '@/services/loginService';
import { signUpService } from '@/services/signUpService';
import { logoutService } from '@/services/logoutService';

interface LoginParams {
    email: string;
    password: string;
}

interface SignUpParams {
    name: string;
    email: string;
    password: string;
}

export function useAuth() {
    const navigate = useNavigate();

    const mutationLogin = useMutation({
        mutationFn: (params: LoginParams) => loginService(params.email, params.password),
        onSuccess: () => {
            Swal.fire({
                title: 'Login bem-sucedido',
                icon: 'success',
            });

            navigate('/');
        },
        onError: () => {
            Swal.fire({
                title: 'Erro ao fazer login',
                text: 'Email ou senha incorretos. Tente novamente.',
                icon: 'error',
            });
        },
    });

    const mutationSignUp = useMutation({
        mutationFn: (params: SignUpParams) =>
            signUpService(params.name, params.email, params.password),
        onSuccess: () => {
            Swal.fire({
                title: 'Cadastro bem-sucedido',
                icon: 'success',
            });

            navigate('/');
        },
        onError: () => {
            Swal.fire({
                title: 'Erro ao cadastrar',
                text: 'Verifique os dados e tente novamente.',
                icon: 'error',
            });
        },
    });

    const mutationLogout = useMutation({
        mutationFn: () => logoutService(),
        onSuccess: () => {
            navigate('/auth/login');
        },
        onError: () => {
            Swal.fire({
                title: 'Erro ao sair',
                text: 'Tente novamente.',
                icon: 'error',
            });
        },
    });

    return {
        login: mutationLogin.mutate,
        signUp: mutationSignUp.mutate,
        logout: mutationLogout.mutate,
    };
}
