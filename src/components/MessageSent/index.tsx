import ReceivedIcon from '@/assets/svg/ReceivedIcon';
import SentIcon from '@/assets/svg/SentIcon';
import { Message } from '@/types/message';

import Avatar from '../Avatar';
import MessageContent from '../MessageContent';

interface Props {
    message: Message;
}
const MessageSent = ({ message }: Props) => {
    return (
        <div className="message-wrapper sent">
            <MessageContent message={message} />
            {/* <Avatar size="tiny" /> */}
            {/* <SentIcon className="w-4 h-4" /> */}
            <ReceivedIcon className="sent-status w-4 h-4" />
        </div>
    );
};

export default MessageSent;
