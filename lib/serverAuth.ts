import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

//@NOTE достаем юзера из текущий сессии и смотрим есть ли такой в БД
const serverAuth = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session?.user?.email) throw new Error('Логин не найден');

  const currentUser = session?.user;

  if (!currentUser) throw new Error('Пользователь не найден');

  return { currentUser };
};

export default serverAuth;
