import { Outlet } from 'react-router-dom';

const GuessLayout = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full max-w-screen-sm">
                <Outlet />
            </div>
        </div>
    );
};

export default GuessLayout;
