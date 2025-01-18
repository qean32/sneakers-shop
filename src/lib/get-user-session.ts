import { authOptions } from '@/components/shared/constants/auth-options';
import { getServerSession } from 'next-auth';

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
