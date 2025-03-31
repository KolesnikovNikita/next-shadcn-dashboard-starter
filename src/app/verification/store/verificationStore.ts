import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type VerificationStep = 'email' | 'phone' | 'documents' | 'interview';

interface VerificationState {
  currentStep: VerificationStep;
  email: string;
  phone: string;
  documents: {
    id?: string;
    selfie?: string;
    passport?: string;
  };
  interviewStatus: 'pending' | 'scheduled' | 'completed';
  isCompleted: boolean;
  setCurrentStep: (step: VerificationStep) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setDocument: (
    type: keyof VerificationState['documents'],
    value: string
  ) => void;
  setInterviewStatus: (status: VerificationState['interviewStatus']) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 'email' as VerificationStep,
  email: '',
  phone: '',
  documents: {},
  interviewStatus: 'pending' as const,
  isCompleted: false
};

export const useVerificationStore = create<VerificationState>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentStep: (step) => set({ currentStep: step }),
      setEmail: (email) => set({ email }),
      setPhone: (phone) => set({ phone }),
      setDocument: (type, value) =>
        set((state) => ({
          documents: {
            ...state.documents,
            [type]: value
          }
        })),
      setInterviewStatus: (status) => set({ interviewStatus: status }),
      reset: () => set(initialState)
    }),
    {
      name: 'verification-storage'
    }
  )
);
