import React, { useState, useRef } from 'react';
import { 
  UploadIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  CameraIcon, 
  FileTextIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
  LoaderIcon
} from 'lucide-react';
import { useVerificationStore } from '../store/useVerificationStore';

export const IdentityVerification = ({ onVerificationComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadStatus, setUploadStatus] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const {
    verificationData,
    updateVerificationData,
    updatePersonalInfo,
    submitVerification,
    setVerificationStatus
  } = useVerificationStore();

  const fileInputRefs = {
    documentFront: useRef(null),
    documentBack: useRef(null),
    selfie: useRef(null)
  };

  const documentTypes = [
    { value: 'drivers_license', label: 'Driver\'s License', description: 'Government-issued driver\'s license' },
    { value: 'passport', label: 'Passport', description: 'Valid passport document' },
    { value: 'state_id', label: 'State ID', description: 'Government-issued state identification' },
    { value: 'national_id', label: 'National ID', description: 'Government-issued national identification' }
  ];

  const handleFileUpload = (field, file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, [field]: 'Please upload a valid image (JPEG, PNG) or PDF file' }));
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [field]: 'File size must be less than 10MB' }));
      return;
    }

    updateVerificationData({ [field]: file });
    setUploadStatus(prev => ({ ...prev, [field]: 'uploaded' }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleInputChange = (field, value) => {
    updatePersonalInfo({ [field]: value });
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!verificationData.documentType) {
          newErrors.documentType = 'Please select a document type';
        }
        break;
      case 2:
        if (!verificationData.documentFront) {
          newErrors.documentFront = 'Please upload the front of your document';
        }
        if (!verificationData.documentBack) {
          newErrors.documentBack = 'Please upload the back of your document';
        }
        break;
      case 3:
        if (!verificationData.selfie) {
          newErrors.selfie = 'Please take a selfie for verification';
        }
        break;
      case 4:
        if (!verificationData.personalInfo.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        if (!verificationData.personalInfo.dateOfBirth) {
          newErrors.dateOfBirth = 'Date of birth is required';
        }
        if (!verificationData.personalInfo.address.trim()) {
          newErrors.address = 'Address is required';
        }
        if (!verificationData.personalInfo.phoneNumber.trim()) {
          newErrors.phoneNumber = 'Phone number is required';
        }
        if (!verificationData.personalInfo.ssn.trim()) {
          newErrors.ssn = 'SSN is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const result = await submitVerification();
      
      if (result.success) {
        onVerificationComplete();
      } else {
        setErrors({ submit: result.error || 'Failed to submit verification. Please try again.' });
      }
    } catch (error) {
      console.error('Verification submission error:', error);
      setErrors({ submit: 'Failed to submit verification. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <ShieldCheckIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h2>
        <p className="text-gray-600">
          To comply with regulations and ensure the security of your investments, 
          we need to verify your identity.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Select Document Type</h3>
        <div className="grid gap-3">
          {documentTypes.map((doc) => (
            <label
              key={doc.value}
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                verificationData.documentType === doc.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="documentType"
                value={doc.value}
                checked={verificationData.documentType === doc.value}
                onChange={(e) => updateVerificationData({ documentType: e.target.value })}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{doc.label}</div>
                <div className="text-sm text-gray-500">{doc.description}</div>
              </div>
              {verificationData.documentType === doc.value && (
                <CheckCircleIcon className="h-5 w-5 text-blue-600" />
              )}
            </label>
          ))}
        </div>
        {errors.documentType && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            {errors.documentType}
          </p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FileTextIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Documents</h2>
        <p className="text-gray-600">
          Please upload clear photos of both sides of your selected document.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Front of Document</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              uploadStatus.documentFront === 'uploaded'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => fileInputRefs.documentFront.current?.click()}
          >
            <input 
              ref={fileInputRefs.documentFront}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload('documentFront', e.target.files[0])}
              className="hidden"
            />
            {uploadStatus.documentFront === 'uploaded' ? (
              <div>
                <CheckCircleIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-medium">Document uploaded</p>
              </div>
            ) : (
              <div>
                <UploadIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload front</p>
                <p className="text-sm text-gray-500">JPEG, PNG, or PDF (max 10MB)</p>
              </div>
            )}
          </div>
          {errors.documentFront && (
            <p className="text-red-600 text-sm flex items-center">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {errors.documentFront}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Back of Document</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              uploadStatus.documentBack === 'uploaded'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => fileInputRefs.documentBack.current?.click()}
          >
            <input
              ref={fileInputRefs.documentBack}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload('documentBack', e.target.files[0])}
              className="hidden"
            />
            {uploadStatus.documentBack === 'uploaded' ? (
              <div>
                <CheckCircleIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-medium">Document uploaded</p>
              </div>
            ) : (
              <div>
                <UploadIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload back</p>
                <p className="text-sm text-gray-500">JPEG, PNG, or PDF (max 10MB)</p>
              </div>
            )}
          </div>
          {errors.documentBack && (
            <p className="text-red-600 text-sm flex items-center">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {errors.documentBack}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CameraIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Take a Selfie</h2>
        <p className="text-gray-600">
          Please take a clear selfie to verify your identity matches your document.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            uploadStatus.selfie === 'uploaded'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => fileInputRefs.selfie.current?.click()}
        >
          <input
            ref={fileInputRefs.selfie}
            type="file"
            accept="image/*"
            capture="user"
            onChange={(e) => handleFileUpload('selfie', e.target.files[0])}
            className="hidden"
          />
          {uploadStatus.selfie === 'uploaded' ? (
            <div>
              <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <p className="text-green-700 font-medium text-lg">Selfie captured</p>
            </div>
          ) : (
            <div>
              <CameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Click to take selfie</p>
              <p className="text-sm text-gray-500 mt-2">
                Make sure your face is clearly visible and well-lit
              </p>
            </div>
          )}
        </div>
        {errors.selfie && (
          <p className="text-red-600 text-sm flex items-center justify-center mt-4">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            {errors.selfie}
          </p>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FileTextIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">
          Please provide your personal information to complete verification.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={verificationData.personalInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name as it appears on your document"
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={verificationData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.dateOfBirth && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            value={verificationData.personalInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full address"
          />
          {errors.address && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={verificationData.personalInfo.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {errors.phoneNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Social Security Number (SSN)
          </label>
          <input
            type="text"
            value={verificationData.personalInfo.ssn}
            onChange={(e) => handleInputChange('ssn', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="XXX-XX-XXXX"
            maxLength={11}
          />
          {errors.ssn && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {errors.ssn}
            </p>
          )}
        </div>
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircleIcon className="h-4 w-4 mr-2" />
            {errors.submit}
          </p>
        </div>
      )}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step < currentStep ? <CheckCircleIcon className="h-5 w-5" /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Document Type</span>
          <span>Upload Documents</span>
          <span>Selfie</span>
          <span>Personal Info</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
        {renderCurrentStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        {currentStep < 4 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Verification'
            )}
          </button>
        )}
      </div>
    </div>
  );
};
