import { Message } from '@/types/message';

import Avatar from '../Avatar';
import MessageContent from '../MessageContent';
import { MessageProps } from '../MessageSent';

const MessageReceive = ({ message }: MessageProps) => {
    return (
        <div className="message-wrapper receive gap-1">
            <Avatar />
            <MessageContent message={message} />
        </div>
    );
};

export default MessageReceive;
