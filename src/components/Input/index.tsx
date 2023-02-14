import classNames from 'classnames';
import { useId } from 'react';

type Props = {
    label: string;
    placeholder?: string;
    className?: string;
    name: string;
};

const Input = ({ label, placeholder, className, ...rest }: Props) => {
    const id = useId();
    const classes = classNames(className);
    return (
        <div className={classes}>
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                {label}
            </label>
            <input
                type="text"
                id={id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                placeholder={placeholder}
                required
                {...rest}
            />
        </div>
    );
};

export default Input;
