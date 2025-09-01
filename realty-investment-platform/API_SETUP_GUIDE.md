# RealtyVest API Setup Guide

This guide will walk you through setting up and integrating the APIs for your RealtyVest investment platform.

## 🚀 Quick Start

### 1. Environment Setup

1. **Copy the environment file:**
   ```bash
   cp env.example .env
   ```

2. **Fill in your API keys** in the `.env` file (see API-specific setup below)

3. **Install additional dependencies:**
   ```bash
   npm install @stripe/stripe-js
   ```

### 2. API Service Integration

The following API services have been created and are ready to use:

- **`src/services/apiService.js`** - Main API service for backend communication
- **`src/services/realEstateApi.js`** - Real estate data APIs (RentSpree, Zillow, Walk Score)
- **`src/services/financialApi.js`** - Financial market data (Alpha Vantage, FRED, Yahoo Finance)
- **`src/services/paymentApi.js`** - Payment processing (Stripe, PayPal)

## 📋 API Setup Instructions

### Phase 1: Essential APIs (Start Here)

#### 1. Google Maps API
**Purpose:** Property locations, maps, geocoding

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
4. Create credentials (API Key)
5. Add to `.env`:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

#### 2. Alpha Vantage API
**Purpose:** Market data, REIT information, economic indicators

1. Go to [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Get your free API key
3. Add to `.env`:
   ```env
   VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
   ```

#### 3. Stripe API
**Purpose:** Payment processing for investments

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your publishable key from the API keys section
3. Add to `.env`:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   ```

### Phase 2: Enhanced Features

#### 4. RentSpree API
**Purpose:** Property listings and rental data

1. Go to [RentSpree API](https://rentspree.com/api)
2. Sign up for an account
3. Get your API key
4. Add to `.env`:
   ```env
   VITE_RENTSPREE_API_KEY=your_rentspree_api_key_here
   ```

#### 5. FRED API
**Purpose:** Economic indicators, interest rates

1. Go to [FRED API](https://fred.stlouisfed.org/docs/api/)
2. Request an API key
3. Add to `.env`:
   ```env
   VITE_FRED_API_KEY=your_fred_api_key_here
   ```

#### 6. Walk Score API
**Purpose:** Neighborhood walkability scores

1. Go to [Walk Score API](https://www.walkscore.com/professional/api.php)
2. Sign up for an account
3. Get your API key
4. Add to `.env`:
   ```env
   VITE_WALKSCORE_API_KEY=your_walkscore_api_key_here
   ```

### Phase 3: Advanced Features

#### 7. Zillow API
**Purpose:** Property valuations and market data

1. Go to [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm)
2. Request API access
3. Get your API key
4. Add to `.env`:
   ```env
   VITE_ZILLOW_API_KEY=your_zillow_api_key_here
   ```

#### 8. SendGrid API
**Purpose:** Email notifications and communications

1. Go to [SendGrid](https://sendgrid.com/)
2. Create an account
3. Get your API key
4. Add to `.env`:
   ```env
   VITE_SENDGRID_API_KEY=your_sendgrid_api_key_here
   ```

## 🔧 Implementation Examples 

### Using Real Estate API

```javascript
import realEstateApi from '../services/realEstateApi';

// Get properties with filters
const properties = await realEstateApi.getRentSpreeProperties({
  type: 'residential',
  location: 'Austin, TX',
  minPrice: 200000,
  maxPrice: 500000
});

// Get property details from Zillow
const propertyData = await realEstateApi.getZillowPropertyData('123 Main St, Austin, TX');

// Get walk score for a location
const walkScore = await realEstateApi.getWalkScore(30.2672, -97.7431, 'Austin, TX');
```

### Using Financial API

```javascript
import financialApi from '../services/financialApi';

// Get REIT data
const reitData = await financialApi.getREITData('VNQ');

// Get market overview
const marketData = await financialApi.getMarketOverview();

// Get economic indicators
const economicData = await financialApi.getEconomicIndicators();
```

### Using Payment API

```javascript
import paymentApi from '../services/paymentApi';

// Process investment payment
const paymentResult = await paymentApi.processInvestmentPayment({
  amount: 10000,
  propertyId: 'prop_123',
  userId: 'user_456',
  paymentMethod: 'stripe'
});

// Get payment history
const paymentHistory = await paymentApi.getPaymentHistory('user_456');
```

## 🛠️ Backend API Requirements

Your backend needs to implement the following endpoints:

### Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/verify
POST /api/auth/callback
```

### Property Endpoints
```
GET /api/properties
GET /api/properties/:id
POST /api/properties
PUT /api/properties/:id
DELETE /api/properties/:id
```

### Investment Endpoints
```
GET /api/investments
POST /api/investments
PUT /api/investments/:id
POST /api/investments/record-transaction
```

### Payment Endpoints
```
POST /api/payments/create-intent
POST /api/payments/process
GET /api/payments/history
POST /api/payments/refund
```

## 📊 Data Flow

1. **User searches for properties** → Real Estate API fetches data
2. **User views property details** → Zillow API provides valuations
3. **User makes investment** → Payment API processes transaction
4. **System records investment** → Backend API stores data
5. **User views portfolio** → Financial API provides market data

## 🔒 Security Best Practices

1. **Never expose API keys in client-side code**
2. **Use environment variables for all API keys**
3. **Implement proper error handling**
4. **Use HTTPS for all API communications**
5. **Implement rate limiting**
6. **Validate all user inputs**
7. **Monitor API usage and costs**

## 🚨 Error Handling

All API services include comprehensive error handling:

- **Network errors** → Fallback to mock data
- **API key missing** → Warning messages and mock data
- **Rate limiting** → Retry logic with exponential backoff
- **Invalid responses** → Graceful degradation

## 📈 Performance Optimization

1. **Caching**: Implement caching for frequently accessed data
2. **Pagination**: Use pagination for large datasets
3. **Lazy Loading**: Load data only when needed
4. **Debouncing**: Debounce search inputs
5. **Error Boundaries**: Implement React error boundaries

## 🧪 Testing

Test your API integrations:

```javascript
// Test API connectivity
const testApi = async () => {
  try {
    const data = await realEstateApi.getRentSpreeProperties();
    console.log('API working:', data);
  } catch (error) {
    console.error('API error:', error);
  }
};
```

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify API keys are correctly set
3. Check API documentation for rate limits
4. Test with mock data first
5. Contact API providers for support

## 🎯 Next Steps

1. **Start with Phase 1 APIs** (Google Maps, Alpha Vantage, Stripe)
2. **Test the integration** with your existing components
3. **Add Phase 2 APIs** as needed
4. **Implement backend endpoints** to support the frontend
5. **Add error handling and loading states**
6. **Optimize performance** with caching and pagination

Your RealtyVest platform is now ready to integrate with real-world APIs! 🚀
