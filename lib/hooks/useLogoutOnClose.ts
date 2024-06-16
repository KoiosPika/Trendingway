import { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';

const useLogoutOnClose = () => {
  const { signOut } = useClerk();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('app_navigate', 'false');
      // Delay sign out to allow ongoing processes to complete
      setTimeout(() => signOut(), 500);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const navigating = localStorage.getItem('app_navigate');
        if (navigating !== 'true') {
          // Delay sign out to allow ongoing processes to complete
          setTimeout(() => signOut(), 500);
        }
      }
    };

    const handleClick = () => {
      localStorage.setItem('app_navigate', 'true');
    };

    const handleUnload = () => {
      localStorage.setItem('app_navigate', 'false');
      // Delay sign out to allow ongoing processes to complete
      setTimeout(() => signOut(), 500);
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