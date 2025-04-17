import { getUserDetails } from '@/lib/auth';

export async function updateUserDetails(token: string) {
  try {
    const userDetails = await getUserDetails(token);
    if (!userDetails) {
      console.error('Failed to get user details from database');
      return null;
    }
    return userDetails;
  } catch (error) {
    console.error('Error getting user details:', error);
    return null;
  }
}
