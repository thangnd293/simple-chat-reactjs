import { useNavigate } from 'react-router-dom';

import Input from '@/components/Input';
import { useLogin } from '@/services/use-login';
import { User } from '@/types/user';

const Login = () => {
    const navigate = useNavigate();

    const { mutate: login } = useLogin();

    const redirectToChatPage = (data: User | undefined) => {
        localStorage.setItem('token', JSON.stringify(data));
        navigate('/chat');
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password } = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
        };

        login(
            { username: username.value, password: password.value },
            {
                onSuccess: redirectToChatPage,
            },
        );
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                Login
            </h1>
            <div className="flex flex-col gap-2">
                <Input label={'Username'} placeholder="John" name="username" />
                <Input
                    label={'Password'}
                    placeholder="123456"
                    name="password"
                />
                <button
                    className="inline-block outline-none border-none px-4 py-2 rounded-sm bg-purple-200 self-end"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Login;
