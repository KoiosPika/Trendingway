import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@clerk/nextjs';

const useSessionCheck = () => {
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/session-revoked');
    }
  }, [session, router]);
};

export default useSessionCheck;