import http from '@/common/http';
import { Message } from '@/types/message';
import { useQuery } from '@tanstack/react-query';

function getMessages() {
    return http
        .get<Message[]>('/conversations/63ede20fe63b313e361df648/messages')
        .then((res) => res.data);
}

export function useMessages() {
    return useQuery({
        queryKey: ['messages'],
        queryFn: getMessages,
    });
}
