# Social Login Setup Guide

This guide will help you set up Google and Facebook OAuth authentication for the RealtyVest application.

## Prerequisites

1. Google Developer Account
2. Facebook Developer Account
3. Backend API server to handle token exchange

## Google OAuth Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:5173/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)

### 2. Get Your Credentials

- **Client ID**: Copy from the OAuth 2.0 client
- **Client Secret**: Copy from the OAuth 2.0 client

## Facebook OAuth Setup

### 1. Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select an existing one
3. Add Facebook Login product
4. Configure OAuth settings:
   - Valid OAuth Redirect URIs: `http://localhost:5173/auth/callback`
   - Client OAuth Login: Enabled
   - Web OAuth Login: Enabled

### 2. Get Your Credentials

- **App ID**: Copy from your app settings
- **App Secret**: Copy from your app settings

## Environment Configuration

Create a `.env` file in the root directory:

```env
# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
REACT_APP_GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Facebook OAuth
REACT_APP_FACEBOOK_APP_ID=your-facebook-app-id-here
REACT_APP_FACEBOOK_APP_SECRET=your-facebook-app-secret-here

# Backend API URL
REACT_APP_API_URL=http://localhost:3001/api

# Redirect URI
REACT_APP_REDIRECT_URI=http://localhost:5173/auth/callback
```

## Backend API Requirements

Your backend needs to handle the `/api/auth/callback` endpoint:

```javascript
// Example backend endpoint
app.post('/api/auth/callback', async (req, res) => {
  const { code, provider, redirectUri } = req.body;
  
  try {
    let tokenData;
    
    if (provider === 'google') {
      // Exchange Google code for tokens
      tokenData = await exchangeGoogleCode(code, redirectUri);
    } else if (provider === 'facebook') {
      // Exchange Facebook code for tokens
      tokenData = await exchangeFacebookCode(code, redirectUri);
    }
    
    // Create or update user in your database
    const user = await createOrUpdateUser(tokenData);
    
    // Generate your app's JWT token
    const accessToken = generateJWT(user);
    
    res.json({
      success: true,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        provider: provider
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});
```

## Testing

1. Start your development server: `npm run dev`
2. Navigate to `/auth`
3. Click on Google or Facebook login buttons
4. Complete the OAuth flow
5. You should be redirected back to the callback page

## Security Notes

- Never expose client secrets in frontend code
- Always validate tokens on the backend
- Use HTTPS in production
- Implement proper error handling
- Store user sessions securely

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**: Make sure the redirect URI in your OAuth app matches exactly
2. **"Client ID not found"**: Verify your environment variables are loaded correctly
3. **"Network error"**: Ensure your backend API is running and accessible
4. **"CORS error"**: Configure CORS on your backend to allow requests from your frontend domain

### Debug Steps:

1. Check browser console for errors
2. Verify environment variables are loaded: `console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)`
3. Test OAuth URLs manually in browser
4. Check backend logs for API errors
