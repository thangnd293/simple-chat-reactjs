import { useEffect } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { SocketSingleton } from '@/common/socket';
import MessageReceive from '@/components/MessageReceive/index';
import MessageSent from '@/components/MessageSent';
import { useGlobalContext } from '@/context/GlobalContext';

const Chat = () => {
    const { user, setUser } = useGlobalContext();

    const navigate = useNavigate();
    const socket = SocketSingleton.getInstance().getSocket();

    const onLog = () => {
        socket.emit('log', (data: any) => {
            console.log('From server: ', data);
        });
    };

    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth/login');
    };

    console.log('user', user);

    return (
        <div className="w-full h-screen flex flex-col bg-slate-300">
            <div className="h-14 flex justify-between bg-green-50">
                Header <button onClick={onLog}>Log</button>
                <button onClick={onLogout}>Logout</button>
            </div>
            <div className="w-full flex-1 bg-red-50 overflow-y-auto">
                <div className="w-full flex flex-col">
                    {Array.from({ length: 100 }).map((_, index) => {
                        const isSent = Math.random() > 0.5;
                        const Message = isSent ? MessageSent : MessageReceive;
                        return <Message key={index} />;
                    })}
                </div>
            </div>
            <div className="h-14 bg-green-50">
                <div className="w-full h-full flex items-center">
                    <input
                        className="flex-1 h-full border-none outline-none"
                        type="text"
                        placeholder="Type a message..."
                    />
                    <button className="h-2/3 aspect-square flex items-center justify-center text-white text-lg rounded-full bg-red-300">
                        <IoIosSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
