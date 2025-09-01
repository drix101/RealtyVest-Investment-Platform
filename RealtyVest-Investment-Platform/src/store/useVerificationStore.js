import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useVerificationStore = create(
  persist(
    (set, get) => ({
      // Verification status
      verificationStatus: 'not_started', // 'not_started', 'pending', 'completed', 'rejected', 'skipped'
      
      // Verification data
      verificationData: {
        documentType: '',
        documentFront: null,
        documentBack: null,
        selfie: null,
        personalInfo: {
          fullName: '',
          dateOfBirth: '',
          address: '',
          phoneNumber: '',
          ssn: ''
        }
      },
      
      // Upload progress
      uploadProgress: { 
        documentFront: 0,
        documentBack: 0,
        selfie: 0
      },
      
      // Verification history
      verificationHistory: [],
      
      // Actions
      setVerificationStatus: (status) => {
        set({ verificationStatus: status });
        
        // Add to history
        const historyEntry = {
          status,
          timestamp: new Date().toISOString(),
          action: 'status_change'
        };
        
        set((state) => ({
          verificationHistory: [...state.verificationHistory, historyEntry]
        }));
      },
      
      updateVerificationData: (data) => {
        set((state) => ({
          verificationData: { ...state.verificationData, ...data }
        }));
      },
      
      updatePersonalInfo: (personalInfo) => {
        set((state) => ({
          verificationData: {
            ...state.verificationData,
            personalInfo: { ...state.verificationData.personalInfo, ...personalInfo }
          }
        }));
      },
      
      setUploadProgress: (field, progress) => {
        set((state) => ({
          uploadProgress: { ...state.uploadProgress, [field]: progress }
        }));
      },
      
      submitVerification: async () => {
        const { verificationData } = get();
        
        try {
          set({ verificationStatus: 'pending' });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // In a real app, you would send the data to your backend
          console.log('Submitting verification data:', verificationData);
          
          // Add submission to history
          const historyEntry = {
            status: 'pending',
            timestamp: new Date().toISOString(),
            action: 'submission',
            data: {
              documentType: verificationData.documentType,
              hasDocuments: !!(verificationData.documentFront && verificationData.documentBack),
              hasSelfie: !!verificationData.selfie
            }
          };
          
          set((state) => ({
            verificationHistory: [...state.verificationHistory, historyEntry]
          }));
          
          return { success: true };
        } catch (error) {
          set({ verificationStatus: 'rejected' });
          return { success: false, error: error.message };
        }
      },
      
      approveVerification: () => {
        set({ verificationStatus: 'completed' });
        
        const historyEntry = {
          status: 'completed',
          timestamp: new Date().toISOString(),
          action: 'approval'
        };
        
        set((state) => ({
          verificationHistory: [...state.verificationHistory, historyEntry]
        }));
      },
      
      rejectVerification: (reason) => {
        set({ verificationStatus: 'rejected' });
        
        const historyEntry = {
          status: 'rejected',
          timestamp: new Date().toISOString(),
          action: 'rejection',
          reason
        };
        
        set((state) => ({
          verificationHistory: [...state.verificationHistory, historyEntry]
        }));
      },
      
      skipVerification: () => {
        set({ verificationStatus: 'skipped' });
        
        const historyEntry = {
          status: 'skipped',
          timestamp: new Date().toISOString(),
          action: 'skip'
        };
        
        set((state) => ({
          verificationHistory: [...state.verificationHistory, historyEntry]
        }));
      },
      
      resetVerification: () => {
        set({
          verificationStatus: 'not_started',
          verificationData: {
            documentType: '',
            documentFront: null,
            documentBack: null,
            selfie: null,
            personalInfo: {
              fullName: '',
              dateOfBirth: '',
              address: '',
              phoneNumber: '',
              ssn: ''
            }
          },
          uploadProgress: {
            documentFront: 0,
            documentBack: 0,
            selfie: 0
          }
        });
      },
      
      // Getters
      isVerificationComplete: () => {
        const { verificationStatus } = get();
        return verificationStatus === 'completed';
      },
      
      isVerificationPending: () => {
        const { verificationStatus } = get();
        return verificationStatus === 'pending';
      },
      
      isVerificationRequired: () => {
        const { verificationStatus } = get();
        return ['not_started', 'rejected'].includes(verificationStatus);
      },
      
      canInvest: () => {
        const { verificationStatus } = get();
        return ['completed', 'skipped'].includes(verificationStatus);
      },
      
      getVerificationProgress: () => {
        const { verificationData } = get();
        let progress = 0;
        
        if (verificationData.documentType) progress += 25;
        if (verificationData.documentFront) progress += 25;
        if (verificationData.documentBack) progress += 25;
        if (verificationData.selfie) progress += 25;
        
        return progress;
      },
      
      getLastVerificationAttempt: () => {
        const { verificationHistory } = get();
        return verificationHistory
          .filter(entry => entry.action === 'submission')
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
      }
    }),
    {
      name: 'verification-store',
      partialize: (state) => ({
        verificationStatus: state.verificationStatus,
        verificationData: state.verificationData,
        verificationHistory: state.verificationHistory
      })
    }
  )
);
