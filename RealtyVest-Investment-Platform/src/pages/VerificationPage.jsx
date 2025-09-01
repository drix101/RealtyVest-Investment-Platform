import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdentityVerification } from '../components/IdentityVerification';
import { CheckCircleIcon, ClockIcon, AlertTriangleIcon, ShieldCheckIcon } from 'lucide-react';
import { useVerificationStore } from '../store/useVerificationStore';

export const VerificationPage = () => {
  const navigate = useNavigate();
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  
  const {
    verificationStatus,
    setVerificationStatus,
    skipVerification,
    isVerificationRequired,
    isVerificationComplete,
    isVerificationPending
  } = useVerificationStore();

  useEffect(() => { 
    // Check if user is authenticated
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/auth');
      return;
    }

    // Determine if verification form should be shown
    if (isVerificationComplete() || isVerificationPending()) {
      setShowVerificationForm(false);
    } else if (isVerificationRequired()) {
      setShowVerificationForm(true);
    } else {
      setShowVerificationForm(false);
    }
  }, [navigate, verificationStatus]);

  const handleVerificationComplete = () => {
    setShowVerificationForm(false);
    // In a real app, you would redirect to a success page or dashboard
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleStartVerification = () => {
    setShowVerificationForm(true);
  };

  const handleSkipForNow = () => {
    // Allow user to skip verification temporarily
    skipVerification();
    navigate('/');
  };

  const renderPendingStatus = () => (
    <div className="text-center py-12">
      <ClockIcon className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Verification Under Review
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Your identity verification documents have been submitted and are currently under review. 
        This process typically takes 1-3 business days.
      </p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-yellow-800 text-sm">
          <strong>What happens next?</strong><br />
          • Our team will review your documents<br />
          • You'll receive an email notification once verified<br />
          • You can start investing immediately after verification
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
      >
        Continue to Dashboard
      </button>
    </div>
  );

  const renderCompletedStatus = () => (
    <div className="text-center py-12">
      <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Verification Complete!
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Congratulations! Your identity has been successfully verified. 
        You now have full access to all investment opportunities.
      </p>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto mb-6">
        <p className="text-green-800 text-sm">
          <strong>You can now:</strong><br />
          • Browse and invest in properties<br />
          • Access detailed property analytics<br />
          • Set up automatic investments<br />
          • Withdraw your earnings
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
      >
        Start Investing
      </button>
    </div>
  );

  const renderRejectedStatus = () => (
    <div className="text-center py-12">
      <AlertTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Verification Required
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        We need to verify your identity to comply with regulations and ensure the security of your investments.
      </p>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto mb-6">
        <p className="text-red-800 text-sm">
          <strong>Why verification is required:</strong><br />
          • Compliance with financial regulations<br />
          • Protection against fraud and money laundering<br />
          • Secure your investment account<br />
          • Enable higher investment limits
        </p>
      </div>
      <div className="space-y-3">
        <button
          onClick={handleStartVerification}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Start Verification
        </button>
        <button
          onClick={handleSkipForNow}
          className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Skip for Now (Limited Access)
        </button>
      </div>
    </div>
  );

  const renderWelcomeMessage = () => (
    <div className="text-center py-12">
      <ShieldCheckIcon className="h-16 w-16 text-blue-500 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome to RealtyVest!
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        To get started with investing, we need to verify your identity. 
        This is a quick and secure process that helps protect your account.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-6">
        <p className="text-blue-800 text-sm">
          <strong>What you'll need:</strong><br />
          • Government-issued ID (Driver's License, Passport, etc.)<br />
          • A clear selfie photo<br />
          • Your personal information<br />
          • 5-10 minutes of your time
        </p>
      </div>
      <div className="space-y-3">
        <button
          onClick={handleStartVerification}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Start Identity Verification
        </button>
        <button
          onClick={handleSkipForNow}
          className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Skip for Now (Limited Access)
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Verification</h1>
          <p className="text-gray-600">
            Secure your investment account with identity verification
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md">
          {showVerificationForm ? (
            <div className="p-6 sm:p-8">
              <IdentityVerification onVerificationComplete={handleVerificationComplete} />
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              {verificationStatus === 'pending' && renderPendingStatus()}
              {verificationStatus === 'completed' && renderCompletedStatus()}
              {verificationStatus === 'rejected' && renderRejectedStatus()}
              {!verificationStatus && renderWelcomeMessage()}
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <ShieldCheckIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                Your Security is Our Priority
              </h3>
              <p className="text-sm text-blue-800">
                All verification data is encrypted and stored securely. We use industry-standard 
                security measures to protect your personal information and comply with all 
                applicable regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
