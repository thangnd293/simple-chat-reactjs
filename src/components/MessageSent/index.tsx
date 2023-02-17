import ReceivedIcon from '@/assets/svg/ReceivedIcon';
import SendingIcon from '@/assets/svg/SendingIcon';
import SentIcon from '@/assets/svg/SentIcon';
import { MessageStatus } from '@/types/common';
import { Message } from '@/types/message';

import Avatar from '../Avatar';
import MessageContent from '../MessageContent';

interface Props {
    message: Message;
}
const MessageSent = ({ message }: Props) => {
    const { status } = message;

    return (
        <div className="message-wrapper sent">
            <MessageContent message={message} />
            {renderBadge(status)}
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
