'use client';

import { useCallback, useState } from 'react';
import BaseInput from '@/app/_widget/BaseInput/BaseInput';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const registerUser = async (user: {
  name: string;
  password: string;
  email: string;
}) => {
  return await axios.post('/home/auth/api', user);
};

const authUser = async (email: string, password: string, router: any) => {
  try {
    console.log('Я тут!');
    await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });
    router.push('/');
  } catch (error) {
    console.log('Я тут');
    console.log(error);
  }
};

const AuthGrowUpAnimation = () => {
  const router = useRouter();

  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signUp');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [name, setName] = useState('');

  const loginHandler = useCallback(async () => {
    await authUser(email, password, router);
  }, [email, password, router]);

  const registerUserHandler = useCallback(
    async (user: any) => {
      await registerUser(user);
      await loginHandler();
    },
    [loginHandler],
  );

  return (
    <div className="max-w-[400px] min-h-[360px] h-[450px] mx-auto mb-0 mt-20 relative">
      <div
        className={`bg-black rounded-t-[36px] bg-opacity-90  ${authMode === 'signIn' ? 'transition-all ease-in-out duration-1000 h-2/3 ' : 'transition-all ease-in-out duration-1000 h-full'} shadow-2xl z-20 peer`}
      >
        <form
          className="space-y-6 w-full 2 px-8 py-8"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p
            className="block text-2xl font-medium leading-3 text-red-500 pb-4 text-center cursor-pointer"
            onClick={() => setAuthMode('signUp')}
          >
            Регистрация
          </p>
          <div>
            <BaseInput
              type="text"
              label="Email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
          </div>
          <div className="mt-2">
            <BaseInput
              type="text"
              label="User name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className="mt-2">
            <BaseInput
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <button
            onClick={async () =>
              await registerUserHandler({ email, password, name })
            }
            className="flex
            w-full
            justify-center
            rounded-md
            bg-indigo-600
            px-3
            py-1.5
            ext-sm
            font-semibold
            leading-6
            text-white
            shadow-sm hover:bg-indigo-500
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-indigo-600"
          >
            Войти
          </button>
        </form>
      </div>
      <div
        className={`flex 
        flex-col 
        absolute 
        top-[400px] 
        justify-center 
        items-center 
        w-full 
        bg-white 
        rounded-t-[36px] 
        z-20 
        ${
          authMode === 'signIn'
            ? 'transition-all ease-in-out duration-1000 -translate-y-[330px] h-2/3'
            : "'transition-all ease-in-out duration-1000 -translate-y-[0px] h-[60px]"
        }`}
      >
        <p
          className={`absolute ${authMode === 'signIn' ? 'transition ease-in-out duration-1000 -translate-y-[120px]' : 'transition ease-in-out duration-1000 -translate-y-0]'} text-center text-2xl font-medium leading-3 text-red-500 cursor-pointer`}
          onClick={() => {
            setAuthMode('signIn');
          }}
        >
          Авторизация
        </p>
        <form
          className={`space-y-6 w-full 2 px-8 py-8 ${authMode === 'signIn' ? 'transition-all ease-in-out duration-1000 visible' : 'transition-all ease-in-out duration-500 invisible opacity-0 '}`}
          action="#"
          method="POST"
        >
          <BaseInput type="text" label="Email" />
          <BaseInput type="password" label="Password" className={'mt-2'} />
          <button
            onClick={async () => await loginHandler()}
            type="submit"
            className="flex
            w-full
            justify-center
            rounded-md
            bg-indigo-600
            px-3
            py-1.5
            ext-sm
            font-semibold
            leading-6
            text-white
            shadow-sm hover:bg-indigo-500
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-indigo-600"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
export default AuthGrowUpAnimation;
