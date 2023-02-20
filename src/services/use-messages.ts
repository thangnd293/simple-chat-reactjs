import http from '@/common/http';
import { Message } from '@/types/message';
import { useQuery } from '@tanstack/react-query';

function getMessages() {
    return http
        .get<Message[]>('/conversations/63ef22182e525bb72708a29e/messages')
        .then((res) => res.data);
}

export function useMessages() {
    return useQuery({
        queryKey: ['messages'],
        queryFn: getMessages,
        staleTime: Infinity,
        cacheTime: Infinity,
    });
}
