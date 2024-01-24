export type AuthMode = 'signIn' | 'signUp';
export type AuthType = 'growUp' | 'base';

export type User = {
  name: string;
  password: string;
  email: string;
};

export interface BaseAuthComponentProps {
  name: string;
  email: string;
  password: string;
  authMode: 'signIn' | 'signUp';
  nameChangeHandler: (value: string) => void;
  emailChangeHandler: (value: string) => void;
  passwordChangeHandler: (value: string) => void;
  authChangeHandler: (value: AuthMode) => void;
  loginHandler: () => void;
  registerHandler: () => void;
}

export interface AuthSwitcherProps {
  authType: AuthType;
}
