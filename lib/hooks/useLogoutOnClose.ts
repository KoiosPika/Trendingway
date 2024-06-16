import { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';

const useLogoutOnClose = () => {
  const { signOut } = useClerk();

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Call the Clerk signOut function
      signOut();
    };

    // Add event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [signOut]);
};

export default useLogoutOnClose;