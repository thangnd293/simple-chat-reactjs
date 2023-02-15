import http from '@/common/http';
import { useMutation } from '@tanstack/react-query';

type Input = {
    username: string;
    password: string;
};

export type Response = {
    access_token: string;
};

function login(input: Input) {
    return http.post<Response>('/auth/login', input).then((res) => res.data);
}

export function useLogin() {
    return useMutation((formData: Input) => login(formData));
}
