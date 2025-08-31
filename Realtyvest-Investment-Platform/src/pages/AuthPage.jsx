import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, CheckCircleIcon, ArrowLeftIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react';

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('signup') === 'true' ? 'signup' : 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Signup form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Reset password state
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Update URL when tab changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (activeTab === 'signup') {
      newSearchParams.set('signup', 'true');
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams.toString()}`);
  }, [activeTab]);

  const handleLoginSubmit = e => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', {
      loginEmail,
      loginPassword,
      rememberMe
    });
  };

  const handleSignupSubmit = e => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', {
      firstName,
      lastName,
      email,
      password,
      agreeTerms
    });
  };

  const handleResetSubmit = e => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Reset password for:', resetEmail);
    setResetSent(true);
  };

  // Social Login Handlers
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Google OAuth configuration
      const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';
      const redirectUri = `${window.location.origin}/auth/callback`;
      const scope = 'email profile';
      
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${googleClientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(scope)}&` +
        `access_type=offline&` +
        `prompt=consent`;
      
      // Redirect to Google OAuth
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error('Google login error:', error);
      alert('Failed to connect to Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    try {
      // Facebook OAuth configuration
      const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID || 'your-facebook-app-id';
      const redirectUri = `${window.location.origin}/auth/callback`;
      const scope = 'email,public_profile';
      
      const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
        `client_id=${facebookAppId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(scope)}&` +
        `state=${encodeURIComponent(JSON.stringify({ provider: 'facebook' }))}`;
      
      // Redirect to Facebook OAuth
      window.location.href = facebookAuthUrl;
    } catch (error) {
      console.error('Facebook login error:', error);
      alert('Failed to connect to Facebook. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">RealtyVest</h1>
          <p className="mt-2 text-gray-600">
            Your real estate investment platform
          </p>
        </div>
        {/* Auth Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {!showResetForm ? <>
              {/* Tabs */}
              <div className="flex border-b">
                <button className={`flex-1 py-3 sm:py-4 text-center font-medium ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('login')}>
                  Log In
                </button>
                <button className={`flex-1 py-3 sm:py-4 text-center font-medium ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('signup')}>
                  Sign Up
                </button>
              </div>
              <div className="p-4 sm:p-6">
                {activeTab === 'login' ?
            // Login Form
            <form onSubmit={handleLoginSubmit}>
                    {/* ... login form content ... */}
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <MailIcon size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input id="email" type="email" className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <LockIcon size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input id="password" type={showPassword ? 'text' : 'password'} className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                        <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-1" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-800" onClick={() => setShowResetForm(true)}>
                        Forgot password?
                      </button>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition font-medium">
                      Log In
                    </button>
                  </form> :
            // Signup Form
            <form onSubmit={handleSignupSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <div className="relative">
                          <UserIcon size={18} className="absolute left-3 top-3 text-gray-400" />
                          <input id="first-name" type="text" className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <div className="relative">
                          <UserIcon size={18} className="absolute left-3 top-3 text-gray-400" />
                          <input id="last-name" type="text" className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)} required />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <MailIcon size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input id="signup-email" type="email" className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <LockIcon size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input id="signup-password" type={showPassword ? 'text' : 'password'} className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                        <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-1" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input id="confirm-password" type={showPassword ? 'text' : 'password'} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <input id="agree-terms" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} required />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="agree-terms" className="text-sm text-gray-700">
                          I agree to the{' '}
                          <a href="#" className="text-blue-600 hover:text-blue-800">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-blue-600 hover:text-blue-800">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition font-medium" disabled={!agreeTerms}>
                      Create Account
                    </button>
                  </form>}
                {/* Social Login */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button 
                      type="button" 
                      className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                        <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                        <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.2154 17.135 5.2704 14.29L1.28039 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                      </svg>
                      {isLoading ? 'Connecting...' : 'Google'}
                    </button>
                    <button 
                      type="button" 
                      className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      onClick={handleFacebookLogin}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18.1596 0H1.83957C0.823906 0 0 0.823906 0 1.83957V18.1604C0 19.1761 0.823906 20 1.83957 20H10.8373V12.2727H8.20346V9.24655H10.8373V7.01629C10.8373 4.42823 12.4262 3.02082 14.7123 3.02082C15.8109 3.02082 16.7607 3.10274 17.0391 3.13898V5.83898L15.4712 5.83973C14.2459 5.83973 14.0161 6.41545 14.0161 7.30045V9.24655H16.9396L16.5503 12.2727H14.0161V20H18.1604C19.1761 20 20 19.1761 20 18.1604V1.83957C20 0.823906 19.1761 0 18.1596 0Z" fill="#1877F2" />
                      </svg>
                      {isLoading ? 'Connecting...' : 'Facebook'}
                    </button>
                  </div>
                </div>
              </div>
            </> :
        // Reset Password Form
        <div className="p-4 sm:p-6">
              <button type="button" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6" onClick={() => {
            setShowResetForm(false);
            setResetSent(false);
          }}> 
                <ArrowLeftIcon size={16} className="mr-2" />
                Back to login
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Reset Your Password
              </h2>
              {resetSent ? <div className="bg-green-50 p-4 rounded-lg text-center">
                  <CheckCircleIcon size={40} className="text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-green-800 mb-1">
                    Check your email
                  </h3>
                  <p className="text-green-700">
                    We've sent password reset instructions to {resetEmail}
                  </p>
                </div> : <>
                  <p className="text-gray-600 mb-6">
                    Enter your email address and we'll send you instructions to
                    reset your password.
                  </p>
                  <form onSubmit={handleResetSubmit}>
                    <div className="mb-6">
                      <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <MailIcon size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input id="reset-email" type="email" className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition font-medium">
                      Send Reset Link
                    </button>
                  </form>
                </>}
            </div>}
        </div>
      </div>
    </div>;
};