import classNames from 'classnames';

import { MessageType } from '@/types/common';
import { Message } from '@/types/message';

interface Props {
    message: Message;
}

const styles: Record<MessageType, string> = {
    text: 'p-2.5 bg-blue-500 text-white',
    image: 'bg-red-500 text-white',
};

const MessageContent = ({ message }: Props) => {
    const { type, content } = message;
    const classes = classNames('message', styles[type]);

    return <div className={classes}>{content}</div>;
};

export default MessageContent;
