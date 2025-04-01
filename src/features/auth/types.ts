export enum UserRole {
  PLAYER = 2,
  AGENT = 1
}

export interface VerificationHistory {
  type: string;
  status: string;
  publicNote: string;
  internalNote: string;
  createUser: string;
  cerateUtc: string;
}

export interface UserDocument {
  id: string;
  fileName: string;
  content: string;
  contentType: string;
  userId: string;
  uploadDate: string;
}

export interface UserDetails {
  userID: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  dateOfBirth: string;
  additionalNumber: string;
  roles: string[];
  email: string;
  isEmailConfirmed: boolean;
  phoneNumber: string;
  isPhoneConfirmed: boolean;
  isDocumentConfirmed: boolean;
  isInterviewConfirmed: boolean;
  interviewStatus: number;
  createUtc: string;
  profileImage: string;
  tenant: number;
  verificationHistory: VerificationHistory[];
  userDocument: UserDocument[];
}
