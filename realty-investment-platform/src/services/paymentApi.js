// Payment API Service - Payment processing and transaction management
class PaymentApiService {
  constructor() {
    this.apiKeys = {
      stripe: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      paypal: import.meta.env.VITE_PAYPAL_CLIENT_ID
    };
    this.stripe = null;
    this.paypal = null;
  }

  // Initialize Stripe
  async initializeStripe() {
    if (!this.apiKeys.stripe) {
      console.warn('Stripe API key not configured');
      return false; 
    }

    try {
      // Dynamically import Stripe
      const { loadStripe } = await import('@stripe/stripe-js');
      this.stripe = await loadStripe(this.apiKeys.stripe);
      return true;
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      return false;
    }
  }

  // Initialize PayPal
  async initializePayPal() {
    if (!this.apiKeys.paypal) {
      console.warn('PayPal API key not configured');
      return false;
    }

    try {
      // PayPal SDK initialization would go here
      // For now, we'll use a mock implementation
      this.paypal = {
        clientId: this.apiKeys.paypal,
        initialized: true
      };
      return true;
    } catch (error) {
      console.error('Failed to initialize PayPal:', error);
      return false;
    }
  }

  // Stripe Payment Methods
  async createStripePaymentIntent(amount, currency = 'usd', metadata = {}) {
    if (!this.stripe) {
      await this.initializeStripe();
    }

    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
          metadata
        })
      });

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      throw error;
    }
  }

  async confirmStripePayment(clientSecret, paymentMethod) {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    try {
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret,
        { payment_method: paymentMethod }
      );

      if (error) {
        throw new Error(error.message);
      }

      return paymentIntent;
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      throw error;
    }
  }

  async createStripeSubscription(priceId, customerId) {
    if (!this.stripe) {
      await this.initializeStripe();
    }

    try {
      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerId
        })
      });

      const { subscription } = await response.json();
      return subscription;
    } catch (error) {
      console.error('Failed to create subscription:', error);
      throw error;
    }
  }

  // PayPal Payment Methods
  async createPayPalOrder(amount, currency = 'USD') {
    if (!this.paypal) {
      await this.initializePayPal();
    }

    try {
      const response = await fetch('/api/payments/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency
        })
      });

      const { orderId } = await response.json();
      return orderId;
    } catch (error) {
      console.error('Failed to create PayPal order:', error);
      throw error;
    }
  }

  async capturePayPalOrder(orderId) {
    try {
      const response = await fetch('/api/payments/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId })
      });

      const { order } = await response.json();
      return order;
    } catch (error) {
      console.error('Failed to capture PayPal order:', error);
      throw error;
    }
  }

  // Investment Payment Processing
  async processInvestmentPayment(investmentData) {
    const { amount, propertyId, userId, paymentMethod } = investmentData;

    try {
      let paymentResult;

      if (paymentMethod === 'stripe') {
        const clientSecret = await this.createStripePaymentIntent(amount, 'usd', {
          propertyId,
          userId,
          type: 'investment'
        });
        
        paymentResult = await this.confirmStripePayment(clientSecret, paymentMethod);
      } else if (paymentMethod === 'paypal') {
        const orderId = await this.createPayPalOrder(amount, 'USD');
        paymentResult = await this.capturePayPalOrder(orderId);
      } else {
        throw new Error('Unsupported payment method');
      }

      // Record the investment transaction
      await this.recordInvestmentTransaction({
        ...investmentData,
        paymentId: paymentResult.id,
        status: paymentResult.status,
        amount,
        timestamp: new Date().toISOString()
      });

      return paymentResult;
    } catch (error) {
      console.error('Failed to process investment payment:', error);
      throw error;
    }
  }

  // Transaction Recording
  async recordInvestmentTransaction(transactionData) {
    try {
      const response = await fetch('/api/investments/record-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData)
      });

      const transaction = await response.json();
      return transaction;
    } catch (error) {
      console.error('Failed to record investment transaction:', error);
      throw error;
    }
  }

  // Payment History
  async getPaymentHistory(userId, limit = 50, offset = 0) {
    try {
      const response = await fetch(
        `/api/payments/history?userId=${userId}&limit=${limit}&offset=${offset}`
      );
      
      const { payments, total } = await response.json();
      return { payments, total };
    } catch (error) {
      console.error('Failed to get payment history:', error);
      throw error;
    }
  }

  // Refund Processing
  async processRefund(paymentId, amount = null, reason = 'requested_by_customer') {
    try {
      const response = await fetch('/api/payments/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          amount,
          reason
        })
      });

      const refund = await response.json();
      return refund;
    } catch (error) {
      console.error('Failed to process refund:', error);
      throw error;
    }
  }

  // Subscription Management
  async getSubscriptions(userId) {
    try {
      const response = await fetch(`/api/subscriptions?userId=${userId}`);
      const subscriptions = await response.json();
      return subscriptions;
    } catch (error) {
      console.error('Failed to get subscriptions:', error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId) {
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST'
      });

      const subscription = await response.json();
      return subscription;
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  }

  // Utility Methods
  formatAmount(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount);
  }

  validatePaymentAmount(amount) {
    if (amount <= 0) {
      throw new Error('Payment amount must be greater than 0');
    }
    if (amount < 1) {
      throw new Error('Minimum payment amount is $1.00');
    }
    if (amount > 100000) {
      throw new Error('Maximum payment amount is $100,000');
    }
    return true;
  }

  // Mock implementations for development
  async mockPaymentProcessing(amount, paymentMethod) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success/failure
    const success = Math.random() > 0.1; // 90% success rate

    if (!success) {
      throw new Error('Payment processing failed');
    }

    return {
      id: `mock_payment_${Date.now()}`,
      amount,
      currency: 'USD',
      status: 'succeeded',
      paymentMethod,
      timestamp: new Date().toISOString()
    };
  }

  async mockInvestmentTransaction(investmentData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      id: `mock_investment_${Date.now()}`,
      ...investmentData,
      status: 'completed',
      timestamp: new Date().toISOString()
    };
  }
}

export default new PaymentApiService();
