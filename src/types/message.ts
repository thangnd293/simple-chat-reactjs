import { MessageStatus, MessageType } from './common';
import { User } from './user';

export type Message = {
    _id: string;
    type: MessageType;
    content: string;
    sender: User;
    status: MessageStatus;
};
