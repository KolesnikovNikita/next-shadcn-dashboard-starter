import { getUserDetails } from '@/lib/auth';
import { useUserStore } from '@/store/user';

export const updateUserDetails = async () => {
  try {
    const userDetails = await getUserDetails();
    const setUserDetails = useUserStore.getState().setUserDetails;
    setUserDetails(userDetails);
  } catch (error) {
    console.error('Error updating user details:', error);
  }
};
