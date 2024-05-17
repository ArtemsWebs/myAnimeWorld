import BaseInput from '@/app/ui/BaseInput/BaseInput';
import { BaseAuthComponentProps } from '@/app/auth/components/Auth.types';
import Show from '@/app/ui/Show/Show';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { SiShikimori } from 'react-icons/si';
import { signIn } from 'next-auth/react';

const githubOA2 = async () => {
  await signIn('github', { callbackUrl: '/home/animes/' });
};

const googleOA2 = async () => {
  await signIn('google', { callbackUrl: '/home/animes/' });
};

const shikimoriOA2 = async () => {
  await signIn('shikimori', { callbackUrl: '/home/animes/' });
};

const BaseAuth = ({
  name,
  nameChangeHandler,
  passwordChangeHandler,
  emailChangeHandler,
  authChangeHandler,
  registerHandler,
  loginHandler,
  password,
  email,
  authMode,
}: BaseAuthComponentProps) => {
  const isSignIn = authMode === 'signIn';
  return (
    <div className="max-w-[500px] min-h-[360px] mx-auto mb-0 mt-20 relative">
      <div
        className={`bg-black rounded-[36px] bg-opacity-90  ${authMode === 'signIn' ? 'transition-all ease-in-out duration-1000 h-4/5 ' : 'h-full'} shadow-2xl z-20 peer`}
      >
        <form
          className="space-y-6 w-full 2 px-8 py-8"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p className="block text-2xl font-medium leading-3 text-white pb-4 text-start">
            {isSignIn ? 'Авторизация' : 'Регистрация'}
          </p>
          <div>
            <BaseInput
              type="text"
              label="Email"
              onChange={(e) => emailChangeHandler(e.currentTarget.value)}
              value={email}
            />
          </div>
          <Show when={!isSignIn}>
            <div className="mt-2">
              <BaseInput
                type="text"
                label="User name"
                value={name}
                onChange={(e) => nameChangeHandler(e.currentTarget.value)}
              />
            </div>
          </Show>
          <div className="mt-2">
            <BaseInput
              type="password"
              label="Password"
              value={password}
              onChange={(e) => passwordChangeHandler(e.currentTarget.value)}
            />
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div
              onClick={async () => googleOA2()}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer transition ease-in-out duration-600 hover:opacity-80"
              title="Войти через гугл"
            >
              <FcGoogle size={30} />
            </div>

            <div
              onClick={async () => githubOA2()}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer transition ease-in-out duration-600 hover:opacity-80"
              title="войти через github"
            >
              <FaGithub size={30} />
            </div>
            <div
              onClick={async () => shikimoriOA2()}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer transition ease-in-out duration-600 hover:opacity-80"
              title="войти через shikimori"
            >
              <SiShikimori size={30} />
            </div>
          </div>
          <button
            onClick={async () => {
              if (isSignIn) await loginHandler();
              else await registerHandler();
            }}
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
          <div className="flex gap-4">
            <Show when={isSignIn}>
              <>
                <p className="block text-gray-400">
                  Первый раз на нашем сайте ?
                </p>
                <p
                  onClick={() => authChangeHandler('signUp')}
                  className="text-white hover:text-blue-500 cursor-pointer"
                >
                  Создайте аккаунт
                </p>
              </>
            </Show>
            <Show when={!isSignIn}>
              <>
                <p className="block text-gray-400">У вас уже есть аккаунт ?</p>
                <p
                  onClick={() => authChangeHandler('signIn')}
                  className="text-white hover:text-blue-500 cursor-pointer"
                >
                  Войти
                </p>
              </>
            </Show>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BaseAuth;
