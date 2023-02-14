import Avatar from '../Avatar';
import MessageContent from '../MessageContent';

const MessageReceive = () => {
    return (
        <div className="message-wrapper receive gap-1">
            <Avatar />
            <MessageContent type={'text'} />
        </div>
    );
};

export default MessageReceive;
