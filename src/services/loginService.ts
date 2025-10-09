import { api } from '@/lib/api';

interface Response {
    data: {
        id: string;
        email: string;
        name: string;
        accessToken: string;
    };
    message: string;
}

export async function loginService(email: string, password: string) {
    const response = await api.post<Response>('/auth/login', { email, password });

    return response.data;
}
