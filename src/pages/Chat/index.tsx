import { useEffect, useRef } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { SocketSingleton } from '@/common/socket';
import MessageReceive from '@/components/MessageReceive/index';
import MessageSent from '@/components/MessageSent';
import { useGlobalContext } from '@/context/GlobalContext';
import { useMessages } from '@/services/use-messages';
import { useSendMessage } from '@/services/use-send-message';
import { MessageType } from '@/types/common';

import { useRevalidateMessages } from '../../services/use-revalidate-messages';

const Chat = () => {
    const { user, setUser } = useGlobalContext();

    const { data: messages } = useMessages();
    // const { mutate: sendMessage } = useSendMessage();
    const revalidateMessages = useRevalidateMessages();
    const navigate = useNavigate();
    const socket = SocketSingleton.getInstance().getSocket();

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const onLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/auth/login');
    };

    useEffect(() => {
        socket.on('send-message', revalidateMessages);
        socket.on('new-message', revalidateMessages);

        return () => {
            socket.off('send-message');
            socket.off('new-message');
        };
    }, []);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;

        if (!chatContainer) return;
        console.log('chatContainer', chatContainer.scrollHeight);

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages]);

    const sendMessage = (type: MessageType, content: string) => {
        socket.emit('send-message', {
            type,
            content,
            conversation: '63ede20fe63b313e361df648',
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const input = e.currentTarget.querySelector('input');
        if (!input) return;

        sendMessage(MessageType.Text, input.value);
        input.value = '';
    };

    return (
        <div className="w-full h-screen flex flex-col bg-slate-300">
            <div className="h-14 flex justify-between bg-green-50">
                Header
                <button onClick={onLogout}>Logout</button>
            </div>
            <div
                className="w-full flex-1 bg-red-50 overflow-y-auto"
                ref={chatContainerRef}
            >
                <div className="w-full flex flex-col">
                    {messages?.map((message) => {
                        const isSent = user?._id === message.sender._id;
                        const Message = isSent ? MessageSent : MessageReceive;
                        return <Message key={message._id} message={message} />;
                    })}
                </div>
            </div>
            <div className="h-14 bg-green-50">
                <form
                    onSubmit={onSubmit}
                    className="w-full h-full flex items-center"
                >
                    <input
                        className="flex-1 h-full border-none outline-none"
                        type="text"
                        placeholder="Type a message..."
                    />
                    <button
                        className="h-2/3 aspect-square flex items-center justify-center text-white text-lg rounded-full bg-red-300"
                        type="submit"
                    >
                        <IoIosSend />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
