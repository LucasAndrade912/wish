import { api } from '@/lib/api';

interface Response {
    message: string;
}

export async function logoutService() {
    const response = await api.post<Response>('/auth/logout');

    return response.data;
}
