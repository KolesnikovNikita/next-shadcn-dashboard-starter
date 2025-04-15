import { getUserDetails } from '@/lib/auth';
import { useUserStore } from '@/store/user';

export async function updateUserDetails() {
  try {
    const userDetails = await getUserDetails();
    if (userDetails) {
      useUserStore.getState().setUserDetails(userDetails);
      return userDetails;
    }
    return null;
  } catch (error) {
    console.error('Error updating user details:', error);
    return null;
  }
}
