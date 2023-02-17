import { useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import { IoIosSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { SocketSingleton } from '@/common/socket';
import MessageReceive from '@/components/MessageReceive/index';
import MessageSent from '@/components/MessageSent';
import { useGlobalContext } from '@/context/GlobalContext';
import { useMessages } from '@/services/use-messages';
import { useRevalidateMessages } from '@/services/use-revalidate-messages';
import { MessageStatus, MessageType } from '@/types/common';
import { Message } from '@/types/message';

const Chat = () => {
    const [isShowScrollDown, setIsShowScrollDown] = useState(false);
    const { user, setUser } = useGlobalContext();

    const { data: messages } = useMessages();

    const [currentMessages, setCurrentMessages] = useState<
        Message[] | undefined
    >(messages);

    const revalidateMessages = useRevalidateMessages();
    const navigate = useNavigate();
    const socket = SocketSingleton.getInstance().getSocket();

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentMessages(messages);
    }, [messages]);

    useEffect(() => {
        socket.on('send-message', revalidateMessages);
        socket.on('new-message', revalidateMessages);
        socket.on('read-message', revalidateMessages);

        return () => {
            socket.off('send-message');
            socket.off('new-message');
            socket.off('read-message');
        };
    }, []);

    const handleScrollToBottom = useCallback(
        (scrollBehavior: 'auto' | 'smooth' = 'auto') => {
            const chatContainerElement = chatContainerRef.current;
            if (!chatContainerElement) return;

            const { scrollHeight } = chatContainerElement;
            chatContainerElement.style.scrollBehavior = scrollBehavior;
            chatContainerElement.scrollTop = scrollHeight;
        },
        [],
    );

    useEffect(() => {
        if (isShowScrollDown) return;
        handleScrollToBottom();
    }, [handleScrollToBottom, currentMessages, isShowScrollDown]);

    const sendMessage = (type: MessageType, content: string) => {
        socket.emit('send-message', {
            type,
            content,
            conversation: '63ef22182e525bb72708a29e',
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const input = e.currentTarget.querySelector('input');
        if (!input) return;

        sendMessage(MessageType.Text, input.value);

        const newMessage: Message = {
            _id: Math.random().toString(),
            type: MessageType.Text,
            content: input.value,
            sender: user!,
            status: MessageStatus.Sending,
        };
        setCurrentMessages((prev) => [...(prev || []), newMessage]);
        input.value = '';
    };

    const onLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/auth/login');
    };

    console.log('messages', messages);

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

        if (scrollTop + clientHeight === scrollHeight) {
            // the element has been scrolled to the bottom

            socket.emit('read-message', {
                conversationId: '63ef22182e525bb72708a29e',
            });
        }

        setIsShowScrollDown(scrollHeight - (clientHeight + scrollTop) > 100);
    };

    return (
        <div className="w-full h-screen flex flex-col bg-slate-300">
            <div className="h-14 flex justify-between bg-green-50">
                Header {user?.name}
                <button onClick={onLogout}>Logout</button>
            </div>
            <div
                className="w-full flex-1 bg-red-50 overflow-y-auto"
                ref={chatContainerRef}
                onScroll={handleScroll}
            >
                <div className="w-full flex flex-col">
                    {currentMessages?.map((message) => {
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
            {isShowScrollDown && (
                <button
                    className="fixed left-1/2 bottom-40 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-green-300"
                    onClick={() => handleScrollToBottom('smooth')}
                >
                    <FiArrowDown />
                </button>
            )}
        </div>
    );
};

export default Chat;
