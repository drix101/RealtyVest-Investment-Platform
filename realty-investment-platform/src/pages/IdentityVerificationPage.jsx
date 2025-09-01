import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  CameraIcon, 
  FileTextIcon,
  CreditCardIcon,
  ShieldIcon,
  ArrowLeftIcon,
  LoaderIcon
} from 'lucide-react';

export const IdentityVerificationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, processing, approved, rejected
  
  // Document upload states
  const [documents, setDocuments] = useState({
    governmentId: null,
    proofOfAddress: null,
    selfie: null,
    bankStatement: null
  });
  
  // Personal information states
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    ssn: ''
  });

  const steps = [
    { id: 1, title: 'Personal Information', description: 'Provide your basic details' },
    { id: 2, title: 'Government ID', description: 'Upload a valid government-issued ID' },
    { id: 3, title: 'Proof of Address', description: 'Upload a recent utility bill or bank statement' },
    { id: 4, title: 'Selfie Verification', description: 'Take a selfie for identity confirmation' },
    { id: 5, title: 'Bank Information', description: 'Verify your banking details' },
    { id: 6, title: 'Review & Submit', description: 'Review all information before submission' }
  ];

  const handleFileUpload = (documentType, file) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const handleInputChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitVerification = async () => {
    setIsUploading(true);
    setVerificationStatus('processing');
    
    try {
      // Simulate API call for verification
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock verification result
      const isApproved = Math.random() > 0.3; // 70% approval rate for demo
      setVerificationStatus(isApproved ? 'approved' : 'rejected');
      
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('rejected');
    } finally {
      setIsUploading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <ShieldIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h2>
              <p className="text-gray-600">To comply with regulations and ensure security, we need to verify your identity.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={personalInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full legal name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={personalInfo.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SSN (Last 4 digits)</label>
                <input
                  type="text"
                  maxLength="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={personalInfo.ssn}
                  onChange={(e) => handleInputChange('ssn', e.target.value.replace(/\D/g, ''))}
                  placeholder="1234"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={personalInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={personalInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="New York"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={personalInfo.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="NY"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={personalInfo.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FileTextIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Government ID</h2>
              <p className="text-gray-600">Upload a clear photo of your government-issued ID (Driver's License, Passport, or State ID)</p>
            </div>
            
            <DocumentUpload
              documentType="governmentId"
              title="Government ID"
              description="Driver's License, Passport, or State ID"
              acceptedTypes="image/*,.pdf"
              onFileUpload={handleFileUpload}
              uploadedFile={documents.governmentId}
            />
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Requirements:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• ID must be valid and not expired</li>
                <li>• All text must be clearly readable</li>
                <li>• Photo must be well-lit and in focus</li>
                <li>• Acceptable formats: JPG, PNG, PDF</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FileTextIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Proof of Address</h2>
              <p className="text-gray-600">Upload a recent document that shows your current address</p>
            </div>
            
            <DocumentUpload
              documentType="proofOfAddress"
              title="Proof of Address"
              description="Utility bill, bank statement, or lease agreement"
              acceptedTypes="image/*,.pdf"
              onFileUpload={handleFileUpload}
              uploadedFile={documents.proofOfAddress}
            />
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Accepted Documents:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Utility bill (electric, gas, water) - within 3 months</li>
                <li>• Bank or credit card statement - within 3 months</li>
                <li>• Lease agreement or mortgage statement</li>
                <li>• Government correspondence - within 3 months</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CameraIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Selfie Verification</h2>
              <p className="text-gray-600">Take a selfie to confirm your identity matches your ID</p>
            </div>
            
            <DocumentUpload
              documentType="selfie"
              title="Selfie Photo"
              description="Take a clear selfie holding your ID next to your face"
              acceptedTypes="image/*"
              onFileUpload={handleFileUpload}
              uploadedFile={documents.selfie}
            />
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Selfie Guidelines:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Hold your ID next to your face</li>
                <li>• Ensure both your face and ID are clearly visible</li>
                <li>• Use good lighting and avoid shadows</li>
                <li>• Look directly at the camera</li>
                <li>• Remove glasses and hats if possible</li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CreditCardIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank Information</h2>
              <p className="text-gray-600">Verify your banking details for investment transactions</p>
            </div>
            
            <DocumentUpload
              documentType="bankStatement"
              title="Bank Statement"
              description="Recent bank statement showing account details"
              acceptedTypes="image/*,.pdf"
              onFileUpload={handleFileUpload}
              uploadedFile={documents.bankStatement}
            />
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Security Notice:</h4>
              <p className="text-sm text-yellow-800">
                Your banking information is encrypted and stored securely. We only use this information 
                to verify your identity and process investment transactions.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircleIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
              <p className="text-gray-600">Please review all information before submitting for verification</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Name:</span> {personalInfo.fullName}</div>
                <div><span className="font-medium">DOB:</span> {personalInfo.dateOfBirth}</div>
                <div><span className="font-medium">Phone:</span> {personalInfo.phoneNumber}</div>
                <div><span className="font-medium">Address:</span> {personalInfo.address}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-gray-900">Uploaded Documents</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  {documents.governmentId ? <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" /> : <AlertCircleIcon className="h-4 w-4 text-red-600 mr-2" />}
                  Government ID: {documents.governmentId ? 'Uploaded' : 'Missing'}
                </div>
                <div className="flex items-center">
                  {documents.proofOfAddress ? <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" /> : <AlertCircleIcon className="h-4 w-4 text-red-600 mr-2" />}
                  Proof of Address: {documents.proofOfAddress ? 'Uploaded' : 'Missing'}
                </div>
                <div className="flex items-center">
                  {documents.selfie ? <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" /> : <AlertCircleIcon className="h-4 w-4 text-red-600 mr-2" />}
                  Selfie: {documents.selfie ? 'Uploaded' : 'Missing'}
                </div>
                <div className="flex items-center">
                  {documents.bankStatement ? <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" /> : <AlertCircleIcon className="h-4 w-4 text-red-600 mr-2" />}
                  Bank Statement: {documents.bankStatement ? 'Uploaded' : 'Missing'}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return personalInfo.fullName && personalInfo.dateOfBirth && personalInfo.address && personalInfo.phoneNumber;
      case 2:
        return documents.governmentId;
      case 3:
        return documents.proofOfAddress;
      case 4:
        return documents.selfie;
      case 5:
        return documents.bankStatement;
      case 6:
        return documents.governmentId && documents.proofOfAddress && documents.selfie && documents.bankStatement;
      default:
        return false;
    }
  };

  if (verificationStatus === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="text-center">
              <LoaderIcon className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Verification</h2>
              <p className="text-gray-600">We're reviewing your documents. This may take a few minutes.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'approved') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="text-center">
              <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Approved!</h2>
              <p className="text-gray-600 mb-6">Your identity has been successfully verified. You can now access all features of RealtyVest.</p>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition font-medium"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'rejected') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="text-center">
              <AlertCircleIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
              <p className="text-gray-600 mb-6">We couldn't verify your identity. Please check your documents and try again.</p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setVerificationStatus('pending');
                    setCurrentStep(1);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition font-medium"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/auth')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Login
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Identity Verification</h1>
          <p className="text-gray-600 mt-2">Complete your verification to start investing</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircleIcon size={20} />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            {renderStepContent()}
          </div>
          
          {/* Navigation */}
          <div className="bg-gray-50 px-6 sm:px-8 py-4 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>
            
            {currentStep === steps.length ? (
              <button
                onClick={handleSubmitVerification}
                disabled={!isStepComplete() || isUploading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
              >
                {isUploading ? 'Submitting...' : 'Submit Verification'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepComplete()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Document Upload Component
const DocumentUpload = ({ documentType, title, description, acceptedTypes, onFileUpload, uploadedFile }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(documentType, e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileUpload(documentType, e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : uploadedFile 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={acceptedTypes}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {uploadedFile ? (
          <div>
            <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-green-900 mb-2">File Uploaded</h3>
            <p className="text-green-700 mb-4">{uploadedFile.name}</p>
            <button
              onClick={() => onFileUpload(documentType, null)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div>
            <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="space-y-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium">
                Choose File
              </button>
              <p className="text-sm text-gray-500">or drag and drop here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
