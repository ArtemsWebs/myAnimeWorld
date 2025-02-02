'use client';

import { useCallback, useMemo, useState } from 'react';
import BaseAuth from '@/app/auth/components/BaseAuth';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { AuthSwitcherProps, User } from '@/app/auth/components/Auth.types';
import AuthGrowUpAnimation from '@/app/auth/components/AuthGrowUpAnimation';
import axios from 'axios';

const registerUser = async (user: User) => {
  return await axios.post('/auth/api', user);
};

const authUser = async (email: string, password: string, router: any) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    }).then(() => router.push('/home/animes'));
  } catch (error) {}
};

const AuthSwitcher = ({ authType }: AuthSwitcherProps) => {
  const router = useRouter();

  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [name, setName] = useState('');

  const loginHandler = useCallback(async () => {
    await authUser(email, password, router);
  }, [email, password, router]);

  const registerUserHandler = useCallback(async () => {
    await registerUser({ name, password, email });
    await loginHandler();
  }, [loginHandler, name]);

  const actualAuth = useMemo(() => {
    switch (authType) {
      case 'base':
        return (
          <BaseAuth
            name={name}
            authMode={authMode}
            authChangeHandler={(value) => setAuthMode(value)}
            email={email}
            password={password}
            loginHandler={loginHandler}
            registerHandler={registerUserHandler}
            emailChangeHandler={(value) => setEmail(value)}
            passwordChangeHandler={(value) => setPassword(value)}
            nameChangeHandler={(value) => setName(value)}
          />
        );
      case 'growUp':
        return (
          <AuthGrowUpAnimation
            name={name}
            authMode={authMode}
            authChangeHandler={(value) => setAuthMode(value)}
            email={email}
            password={password}
            loginHandler={loginHandler}
            registerHandler={registerUserHandler}
            emailChangeHandler={(value) => setEmail(value)}
            passwordChangeHandler={(value) => setPassword(value)}
            nameChangeHandler={(value) => setName(value)}
          />
        );
      default:
        return (
          <BaseAuth
            name={name}
            authMode={authMode}
            authChangeHandler={(value) => setAuthMode(value)}
            email={email}
            password={password}
            loginHandler={loginHandler}
            registerHandler={registerUserHandler}
            emailChangeHandler={(value) => setEmail(value)}
            passwordChangeHandler={(value) => setPassword(value)}
            nameChangeHandler={(value) => setName(value)}
          />
        );
    }
  }, [
    authType,
    authMode,
    name,
    password,
    email,
    registerUserHandler,
    loginHandler,
  ]);

  return <>{actualAuth}</>;
};

export default AuthSwitcher;
