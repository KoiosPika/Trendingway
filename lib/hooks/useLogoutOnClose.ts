import { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';

const useLogoutOnClose = () => {
  const { signOut } = useClerk();

  useEffect(() => {
    const handleBeforeUnload = () => {
      signOut();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        signOut();
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [signOut]);
};

export default useLogoutOnClose;