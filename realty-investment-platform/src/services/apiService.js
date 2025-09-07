// API Service - Centralized API management for RealtyVest
class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    this.apiKeys = { 
      alphaVantage: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
      googleMaps: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      mapbox: import.meta.env.VITE_MAPBOX_API_KEY,
      stripe: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      sendGrid: import.meta.env.VITE_SENDGRID_API_KEY,
      auth0: {
        domain: import.meta.env.VITE_AUTH0_DOMAIN, 
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID
      }
    };
  }

  // Generic API request method
  async makeRequest(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials) {
    return this.makeRequest(`${this.baseURL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData) {
    return this.makeRequest(`${this.baseURL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async verifyIdentity(verificationData) {
    return this.makeRequest(`${this.baseURL}/auth/verify`, {
      method: 'POST',
      body: JSON.stringify(verificationData)
    });
  }

  // Property-related methods
  async getProperties(filters = {}) {
    const queryParams = new URLSearchParams(filters);
    return this.makeRequest(`${this.baseURL}/properties?${queryParams}`);
  }

  async getPropertyById(id) {
    return this.makeRequest(`${this.baseURL}/properties/${id}`);
  }

  async createProperty(propertyData) {
    return this.makeRequest(`${this.baseURL}/properties`, {
      method: 'POST',
      body: JSON.stringify(propertyData)
    });
  }

  async updateProperty(id, propertyData) {
    return this.makeRequest(`${this.baseURL}/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData)
    });
  }

  async deleteProperty(id) {
    return this.makeRequest(`${this.baseURL}/properties/${id}`, {
      method: 'DELETE'
    });
  }

  // Investment methods
  async getInvestments(userId) {
    return this.makeRequest(`${this.baseURL}/investments?userId=${userId}`);
  }

  async createInvestment(investmentData) {
    return this.makeRequest(`${this.baseURL}/investments`, {
      method: 'POST',
      body: JSON.stringify(investmentData)
    });
  }

  async updateInvestment(id, investmentData) {
    return this.makeRequest(`${this.baseURL}/investments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(investmentData)
    });
  }

  // Payment methods
  async processPayment(paymentData) {
    return this.makeRequest(`${this.baseURL}/payments/process`, {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  }

  async getPaymentHistory(userId) {
    return this.makeRequest(`${this.baseURL}/payments/history?userId=${userId}`);
  }

  // User profile methods
  async getUserProfile(userId) {
    return this.makeRequest(`${this.baseURL}/users/${userId}`);
  }

  async updateUserProfile(userId, profileData) {
    return this.makeRequest(`${this.baseURL}/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async uploadDocument(userId, documentData) {
    return this.makeRequest(`${this.baseURL}/users/${userId}/documents`, {
      method: 'POST',
      body: JSON.stringify(documentData)
    });
  }

  // Analytics and reporting
  async getPortfolioAnalytics(userId) {
    return this.makeRequest(`${this.baseURL}/analytics/portfolio?userId=${userId}`);
  }

  async getMarketData() {
    return this.makeRequest(`${this.baseURL}/analytics/market`);
  }

  async getPropertyAnalytics(propertyId) {
    return this.makeRequest(`${this.baseURL}/analytics/property/${propertyId}`);
  }
}

export default new ApiService();
