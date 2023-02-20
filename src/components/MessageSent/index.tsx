import ReceivedIcon from '@/assets/svg/ReceivedIcon';
import SendingIcon from '@/assets/svg/SendingIcon';
import SentIcon from '@/assets/svg/SentIcon';
import { MessageStatus } from '@/types/common';
import { Message } from '@/types/message';

import Avatar from '../Avatar';
import MessageContent from '../MessageContent';

export interface MessageProps {
    message: Message;
    isLastMessageSeen?: boolean;
}
const MessageSent = ({ message, isLastMessageSeen }: MessageProps) => {
    const { status } = message;
    const showBadge = status !== MessageStatus.Seen || isLastMessageSeen;
    return (
        <div className="message-wrapper sent">
            <MessageContent message={message} />
            {showBadge ? renderBadge(status) : <div className="w-4" />}
        </div>
    );
};

export default MessageSent;

function renderBadge(status: MessageStatus) {
    return {
        sending: <SendingIcon className="w-4 h-4" />,
        seen: <Avatar size="tiny" />,
        sent: <SentIcon className="sent-status w-4 h-4" />,
        received: <ReceivedIcon className="received-status w-4 h-4" />,
    }[status];
}
