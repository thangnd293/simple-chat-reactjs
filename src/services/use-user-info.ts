import http from '@/common/http';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

function getUserInfo() {
    return http.get<User>('/users/me').then((response) => response.data);
}

export function useUserInfo() {
    return useQuery({
        queryKey: ['me'],
        queryFn: getUserInfo,
        staleTime: 60 * 1000,
    });
}
