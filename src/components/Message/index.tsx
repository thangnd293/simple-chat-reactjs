import classNames from 'classnames';

interface Props {
    self: boolean;
}

const Message = ({ self }: Props) => {
    const classes = classNames('message-wrapper', {
        sent: self,
        receive: !self,
    });

    return (
        <div className={classes}>
            <div className="message px-4 py-2">Message</div>
        </div>
    );
};

export default Message;
