import http from '@/common/http';
import { Message } from '@/types/message';
import { useMutation } from '@tanstack/react-query';

type Input = Pick<Message, 'type' | 'content'>;
function sendMessage(message: Input) {
    // send message to server
    return http
        .post<Message>('/messages', {
            conversation: '63ede20fe63b313e361df648',
            ...message,
        })
        .then((res) => res.data);
}

export function useSendMessage() {
    return useMutation({
        mutationFn: (message: Input) => sendMessage(message),
    });
}
