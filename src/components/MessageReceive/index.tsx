import { Message } from '@/types/message';

import Avatar from '../Avatar';
import MessageContent from '../MessageContent';

interface Props {
    message: Message;
}
const MessageReceive = ({ message }: Props) => {
    return (
        <div className="message-wrapper receive gap-1">
            <Avatar />
            <MessageContent message={message} />
        </div>
    );
};

export default MessageReceive;
