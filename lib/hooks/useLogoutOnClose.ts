import { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';

const useLogoutOnClose = () => {
  const { signOut } = useClerk();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('app_navigate', 'false');
      signOut();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const navigating = localStorage.getItem('app_navigate');
        if (navigating !== 'true') {
          signOut();
        }
      }
    };

    const handleClick = () => {
      localStorage.setItem('app_navigate', 'true');
    };

    const handleUnload = () => {
      localStorage.setItem('app_navigate', 'false');
    };

    const checkAuthenticationStatus = () => {
      const navigating = localStorage.getItem('app_navigate');
      if (navigating !== 'true') {
        signOut();
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('click', handleClick);
    window.addEventListener('unload', handleUnload);

    const authCheckInterval = setInterval(checkAuthenticationStatus, 1000);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('unload', handleUnload);
      clearInterval(authCheckInterval);
    };
  }, [signOut]);
};

export default useLogoutOnClose;