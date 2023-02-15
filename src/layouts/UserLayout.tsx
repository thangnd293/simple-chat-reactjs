import { useEffect, useMemo, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { GlobalContextProvider } from '@/context/GlobalContext';
import { useUserInfo } from '@/services/use-user-info';
import { User } from '@/types/user';

const UserLayout = () => {
    const [user, setUser] = useState<User | null>(null);
    const { data: userInfo, isFetched } = useUserInfo();

    const store = useMemo(() => ({ user, setUser }), [user, setUser]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        userInfo && setUser(userInfo);
    }, [userInfo]);

    if (!token) {
        return <Navigate to="/auth/login" />;
    }

    if (!isFetched) {
        return <div>Loading...</div>;
    }

    return (
        <GlobalContextProvider value={store}>
            <Outlet />
        </GlobalContextProvider>
    );
};

export default UserLayout;
