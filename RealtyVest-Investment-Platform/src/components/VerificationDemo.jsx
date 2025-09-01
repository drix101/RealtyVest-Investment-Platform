import React from 'react';
import { useVerificationStore } from '../store/useVerificationStore';
import { CheckCircleIcon, ClockIcon, AlertTriangleIcon, ShieldCheckIcon, XCircleIcon } from 'lucide-react';

export const VerificationDemo = () => {
  const {
    verificationStatus,
    isVerificationComplete,
    isVerificationPending,
    isVerificationRequired,
    canInvest,
    getVerificationProgress,
    approveVerification,
    rejectVerification,
    resetVerification
  } = useVerificationStore();

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'completed':
        return <CheckCircleIcon className="h-6 w-6 text-green-600" />;
      case 'pending':
        return <ClockIcon className="h-6 w-6 text-yellow-600" />;
      case 'rejected':
        return <XCircleIcon className="h-6 w-6 text-red-600" />;
      case 'skipped':
        return <AlertTriangleIcon className="h-6 w-6 text-orange-600" />;
      default:
        return <ShieldCheckIcon className="h-6 w-6 text-blue-600" />;
    }
  };

  const getStatusText = () => {
    switch (verificationStatus) {
      case 'completed':
        return 'Verified';
      case 'pending':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      case 'skipped':
        return 'Skipped';
      default:
        return 'Not Started';
    }
  };

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'skipped':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status Demo</h3>
      
      {/* Status Display */}
      <div className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor()}`}>
        <div className="flex items-center">
          {getStatusIcon()}
          <span className="ml-2 font-medium">{getStatusText()}</span>
        </div>
        <div className="text-sm">
          Progress: {getVerificationProgress()}%
        </div>
      </div>

      {/* Status Details */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Verification Complete:</span>
          <span className={isVerificationComplete() ? 'text-green-600' : 'text-gray-500'}>
            {isVerificationComplete() ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Verification Pending:</span>
          <span className={isVerificationPending() ? 'text-yellow-600' : 'text-gray-500'}>
            {isVerificationPending() ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Verification Required:</span>
          <span className={isVerificationRequired() ? 'text-red-600' : 'text-gray-500'}>
            {isVerificationRequired() ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Can Invest:</span>
          <span className={canInvest() ? 'text-green-600' : 'text-gray-500'}>
            {canInvest() ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Demo Controls</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={approveVerification}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() => rejectVerification('Document quality insufficient')}
            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={resetVerification}
            className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Demo Instructions:</strong> Use the buttons above to simulate different verification states. 
          This helps you see how the verification system behaves in different scenarios.
        </p>
      </div>
    </div>
  );
};
