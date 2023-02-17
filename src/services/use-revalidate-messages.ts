import { useQueryClient } from '@tanstack/react-query';

export function useRevalidateMessages() {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ['messages'] });
}
