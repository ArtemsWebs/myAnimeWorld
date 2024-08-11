import { useUserStore } from '@/app/store/User';

export const useCheckAccess = () => {
  const user = useUserStore((state) => state.userInfo);
  const checkPermission = (neddedPermission: string) =>
    user?.permission?.find((permis) => permis.name === neddedPermission);
  return { checkPermission };
};
