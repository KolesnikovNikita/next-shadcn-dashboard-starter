import { getUserDetails, getToken } from '@/lib/auth';
import { useUserStore } from '@/store/user';

export async function updateUserDetails() {
  try {
    const token = getToken();
    if (!token) {
      console.error('No access token found during user details update');
      throw new Error('No access token found');
    }

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
