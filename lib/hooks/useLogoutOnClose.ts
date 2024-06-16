import { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';

const useLogoutOnClose = () => {
  const { signOut } = useClerk();

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('app_navigate', 'false');
      signOut();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const navigating = sessionStorage.getItem('app_navigate');
        if (navigating !== 'true') {
          signOut();
        }
      }
    };

    const handleClick = () => {
      sessionStorage.setItem('app_navigate', 'true');
    };

    const handleUnload = () => {
      sessionStorage.setItem('app_navigate', 'false');
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('click', handleClick);
    window.addEventListener('unload', handleUnload);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('unload', handleUnload);
    };
  }, [signOut]);
};

export default useLogoutOnClose;