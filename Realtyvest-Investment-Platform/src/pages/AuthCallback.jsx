import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, LoaderIcon } from 'lucide-react';

export const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'error'
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const state = searchParams.get('state');

        if (error) {
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          setTimeout(() => navigate('/auth'), 3000);
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code received.');
          setTimeout(() => navigate('/auth'), 3000);
          return;
        }

        // Parse state to determine provider
        let provider = 'google'; // default
        if (state) {
          try {
            const stateData = JSON.parse(decodeURIComponent(state));
            provider = stateData.provider || 'google';
          } catch (e) {
            console.warn('Could not parse state parameter');
          }
        }

        // Exchange code for access token
        const tokenResponse = await exchangeCodeForToken(code, provider);
        
        if (tokenResponse.success) {
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          // Store user data in localStorage or context
          localStorage.setItem('user', JSON.stringify(tokenResponse.user));
          localStorage.setItem('accessToken', tokenResponse.accessToken);
          
          // Redirect to dashboard or home page
          setTimeout(() => navigate('/'), 2000);
        } else {
          setStatus('error');
          setMessage(tokenResponse.error || 'Authentication failed.');
          setTimeout(() => navigate('/auth'), 3000);
        }

      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleAuthCallback();
  }, [searchParams, navigate]);

  const exchangeCodeForToken = async (code, provider) => {
    try {
      // This should call your backend API to exchange the code for tokens
      const response = await fetch('/api/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          provider,
          redirectUri: `${window.location.origin}/auth/callback`
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          accessToken: data.accessToken,
          user: data.user
        };
      } else {
        return {
          success: false,
          error: data.error || 'Failed to authenticate'
        };
      }
    } catch (error) {
      console.error('Token exchange error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center">
            {status === 'processing' && (
              <>
                <LoaderIcon className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Processing Authentication
                </h2>
                <p className="text-gray-600">{message}</p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Authentication Successful
                </h2>
                <p className="text-gray-600">{message}</p>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircleIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Authentication Failed
                </h2>
                <p className="text-gray-600 mb-4">{message}</p>
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
