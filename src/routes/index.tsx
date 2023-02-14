import { RouteObject } from 'react-router-dom';

import GuessLayout from '@/layouts/GuessLayout';
import UserLayout from '@/layouts/UserLayout';
import Chat from '@/pages/Chat';
import Login from '@/pages/Login';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <Chat />,
            },
            {
                path: '/chat',
                element: <Chat />,
            },
        ],
    },
    {
        path: '/auth',
        element: <GuessLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: '/auth/login',
                element: <Login />,
            },
        ],
    },
];
