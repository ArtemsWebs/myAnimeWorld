import { create } from 'zustand';
import { Permission, Role } from '@/app/store/User.types';

interface UserInfo {
  name: string;
  email: string;
  createdAt: string;
  id: string;
  roles: Role[];
  permission: Permission[];
}

interface UserState {
  userInfo?: UserInfo;
  updateUserInfo: (userInfo: UserInfo) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userInfo: undefined,
  updateUserInfo: (userInfo: UserInfo) => set(() => ({ userInfo: userInfo })),
}));
