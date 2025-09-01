# Vite Environment Variables Setup

## ⚠️ Important: Environment Variable Format

Your RealtyVest project uses **Vite** as the build tool, which requires a different format for environment variables compared to Create React App.

## 🔧 Environment Variable Format

### ❌ Create React App Format (Don't Use)
```env
REACT_APP_API_KEY=your_key_here
```

### ✅ Vite Format (Use This)
```env
VITE_API_KEY=your_key_here
```

## 📝 Key Changes Made

All API service files have been updated to use the correct Vite environment variable format:

- `process.env.REACT_APP_*` → `import.meta.env.VITE_*`
- All environment variables now use `VITE_` prefix 
- Updated `env.example` file with correct format
- Updated documentation with correct examples

## 🚀 Quick Setup

1. **Copy the environment file:**
   ```bash
   cp env.example .env
   ```

2. **Add your API keys** using the `VITE_` prefix:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
   VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

## 🔍 Available Environment Variables

All environment variables are listed in `env.example` with the correct `VITE_` prefix:

- `VITE_API_URL` - Backend API URL
- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `VITE_ALPHA_VANTAGE_API_KEY` - Alpha Vantage API key
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `VITE_RENTSPREE_API_KEY` - RentSpree API key
- `VITE_FRED_API_KEY` - FRED API key
- `VITE_WALKSCORE_API_KEY` - Walk Score API key
- `VITE_ZILLOW_API_KEY` - Zillow API key
- `VITE_SENDGRID_API_KEY` - SendGrid API key
- And more...

## 🛠️ How It Works

In Vite, environment variables are accessed using:
```javascript
import.meta.env.VITE_YOUR_VARIABLE_NAME
```

The `VITE_` prefix is required for security - only variables with this prefix are exposed to the client-side code.

## 🔒 Security Note

- Only variables prefixed with `VITE_` are exposed to the browser
- Never put sensitive keys (like secret keys) in environment variables that start with `VITE_`
- Use server-side environment variables for sensitive data

## ✅ Verification

To verify your environment variables are working:

1. Check the browser console for any "API key not configured" warnings
2. The APIs will fall back to mock data if keys are missing
3. You should see mock data being used until you add real API keys

Your RealtyVest platform is now properly configured for Vite! 🎉
