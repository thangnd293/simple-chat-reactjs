import ReceivedIcon from '@/assets/svg/ReceivedIcon';
import SentIcon from '@/assets/svg/SentIcon';

import Avatar from '../Avatar';

const MessageSent = () => {
    return (
        <div className="message-wrapper sent">
            <div className="message">MessageSent</div>
            {/* <Avatar size="tiny" /> */}
            {/* <SentIcon className="w-4 h-4" /> */}
            <ReceivedIcon className="sent-status w-4 h-4" />
        </div>
    );
};

export default MessageSent;
