import ReceivedIcon from '@/assets/svg/ReceivedIcon';
import SentIcon from '@/assets/svg/SentIcon';

import Avatar from '../Avatar';
import MessageContent from '../MessageContent';

const MessageSent = () => {
    return (
        <div className="message-wrapper sent">
            <MessageContent type={'image'} />
            {/* <Avatar size="tiny" /> */}
            {/* <SentIcon className="w-4 h-4" /> */}
            <ReceivedIcon className="sent-status w-4 h-4" />
        </div>
    );
};

export default MessageSent;
