import { create } from 'zustand';

interface UserInfo {
  name: string;
  email: string;
}

interface UserState {
  userInfo?: UserInfo;
  updateUserInfo: (userInfo: UserInfo) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userInfo: undefined,
  updateUserInfo: (userInfo: UserInfo) => set(() => ({ userInfo: userInfo })),
}));
