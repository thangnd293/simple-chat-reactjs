import { RouteObject } from 'react-router-dom';

import Chat from '@/pages/Chat';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Chat />,
    },
];
