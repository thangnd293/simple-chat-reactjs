import classNames from 'classnames';

type Type = 'text' | 'image';

interface Props {
    type: Type;
}

const styles: Record<Type, string> = {
    text: 'p-2.5 bg-blue-500 text-white',
    image: 'bg-red-500 text-white',
};

const MessageContent = ({ type }: Props) => {
    const classes = classNames('message', styles[type]);

    return <div className={classes}>Message</div>;
};

export default MessageContent;
