import classNames from 'classnames';

interface Props {
    size?: 'tiny' | 'medium';
}

const Avatar = ({ size = 'medium' }: Props) => {
    const classes = classNames('avatar rounded-full', {
        'w-4 h-4': size === 'tiny',
        'w-10 h-10': size === 'medium',
    });

    return (
        <img
            className={classes}
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Rounded avatar"
        />
    );
};

export default Avatar;
