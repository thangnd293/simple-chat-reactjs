import http from '@/common/http';
import { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

type Input = {
    username: string;
    password: string;
};

function login(input: Input) {
    return http.post<User>('/users/login', input).then((res) => res.data);
}

export function useLogin() {
    return useMutation((formData: Input) => login(formData));
}
