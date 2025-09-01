// Financial API Service - Market data and financial information
class FinancialApiService {
  constructor() {
    this.apiKeys = {
      alphaVantage: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
      fred: import.meta.env.VITE_FRED_API_KEY,
      yahooFinance: import.meta.env.VITE_YAHOO_FINANCE_API_KEY
    };
  }

  // Generic request method with error handling
  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) { 
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Financial API request failed:', error);
      throw error;
    }
  }

  // Alpha Vantage API Integration
  async getREITData(symbol = 'VNQ') {
    if (!this.apiKeys.alphaVantage) {
      console.warn('Alpha Vantage API key not configured');
      return this.getMockREITData();
    }

    try {
      const data = await this.makeRequest(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKeys.alphaVantage}`
      );
      return this.transformREITData(data);
    } catch (error) {
      console.error('Alpha Vantage API error:', error);
      return this.getMockREITData();
    }
  }

  async getMarketOverview() {
    if (!this.apiKeys.alphaVantage) {
      console.warn('Alpha Vantage API key not configured');
      return this.getMockMarketData();
    }

    try {
      const data = await this.makeRequest(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${this.apiKeys.alphaVantage}`
      );
      return this.transformMarketData(data);
    } catch (error) {
      console.error('Alpha Vantage Market API error:', error);
      return this.getMockMarketData();
    }
  }

  async getEconomicIndicators() {
    if (!this.apiKeys.alphaVantage) {
      console.warn('Alpha Vantage API key not configured');
      return this.getMockEconomicData();
    }

    try {
      const data = await this.makeRequest(
        `https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=10year&apikey=${this.apiKeys.alphaVantage}`
      );
      return this.transformEconomicData(data);
    } catch (error) {
      console.error('Alpha Vantage Economic API error:', error);
      return this.getMockEconomicData();
    }
  }

  // FRED API Integration
  async getInterestRates() {
    if (!this.apiKeys.fred) {
      console.warn('FRED API key not configured');
      return this.getMockInterestRates();
    }

    try {
      const data = await this.makeRequest(
        `https://api.stlouisfed.org/fred/series/observations?series_id=FEDFUNDS&api_key=${this.apiKeys.fred}&file_type=json&limit=1&sort_order=desc`
      );
      return this.transformFREDData(data);
    } catch (error) {
      console.error('FRED API error:', error);
      return this.getMockInterestRates();
    }
  }

  async getInflationData() {
    if (!this.apiKeys.fred) {
      console.warn('FRED API key not configured');
      return this.getMockInflationData();
    }

    try {
      const data = await this.makeRequest(
        `https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=${this.apiKeys.fred}&file_type=json&limit=1&sort_order=desc`
      );
      return this.transformFREDData(data);
    } catch (error) {
      console.error('FRED Inflation API error:', error);
      return this.getMockInflationData();
    }
  }

  // Yahoo Finance API Integration (via RapidAPI)
  async getYahooFinanceData(symbol) {
    if (!this.apiKeys.yahooFinance) {
      console.warn('Yahoo Finance API key not configured');
      return this.getMockYahooData();
    }

    try {
      const data = await this.makeRequest(
        `https://yahoo-finance1.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}`,
        {
          headers: {
            'X-RapidAPI-Key': this.apiKeys.yahooFinance,
            'X-RapidAPI-Host': 'yahoo-finance1.p.rapidapi.com'
          }
        }
      );
      return this.transformYahooData(data);
    } catch (error) {
      console.error('Yahoo Finance API error:', error);
      return this.getMockYahooData();
    }
  }

  // Data transformation methods
  transformREITData(data) {
    const timeSeries = data['Time Series (Daily)'];
    if (!timeSeries) return null;

    const dates = Object.keys(timeSeries).sort();
    const latestDate = dates[dates.length - 1];
    const latestData = timeSeries[latestDate];

    return {
      symbol: data['Meta Data']['2. Symbol'],
      price: parseFloat(latestData['4. close']),
      change: parseFloat(latestData['4. close']) - parseFloat(latestData['1. open']),
      changePercent: ((parseFloat(latestData['4. close']) - parseFloat(latestData['1. open'])) / parseFloat(latestData['1. open']) * 100).toFixed(2),
      volume: parseInt(latestData['5. volume']),
      high: parseFloat(latestData['2. high']),
      low: parseFloat(latestData['3. low']),
      open: parseFloat(latestData['1. open']),
      lastUpdated: latestDate
    };
  }

  transformMarketData(data) {
    const quote = data['Global Quote'];
    if (!quote) return null;

    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: quote['10. change percent'].replace('%', ''),
      volume: parseInt(quote['06. volume']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      open: parseFloat(quote['02. open']),
      previousClose: parseFloat(quote['08. previous close'])
    };
  }

  transformEconomicData(data) {
    const dataSeries = data['data'];
    if (!dataSeries || dataSeries.length === 0) return null;

    const latestData = dataSeries[0];
    return {
      value: parseFloat(latestData.value),
      date: latestData.date,
      type: 'Treasury Yield'
    };
  }

  transformFREDData(data) {
    const observations = data.observations;
    if (!observations || observations.length === 0) return null;

    const latestObservation = observations[0];
    return {
      value: parseFloat(latestObservation.value),
      date: latestObservation.date,
      seriesId: data.series_id
    };
  }

  transformYahooData(data) {
    const summary = data.summaryDetail;
    const price = data.price;
    
    if (!summary || !price) return null;

    return {
      symbol: price.symbol,
      price: price.regularMarketPrice?.raw || 0,
      change: price.regularMarketChange?.raw || 0,
      changePercent: price.regularMarketChangePercent?.raw || 0,
      volume: price.regularMarketVolume?.raw || 0,
      high: summary.dayHigh?.raw || 0,
      low: summary.dayLow?.raw || 0,
      open: summary.open?.raw || 0,
      previousClose: summary.previousClose?.raw || 0,
      marketCap: summary.marketCap?.raw || 0,
      peRatio: summary.trailingPE?.raw || 0,
      dividendYield: summary.dividendYield?.raw || 0
    };
  }

  // Mock data fallbacks
  getMockREITData() {
    return {
      symbol: 'VNQ',
      price: 85.42,
      change: 1.23,
      changePercent: '1.46',
      volume: 1250000,
      high: 86.15,
      low: 84.20,
      open: 84.19,
      lastUpdated: '2024-01-15'
    };
  }

  getMockMarketData() {
    return {
      symbol: 'SPY',
      price: 4850.25,
      change: 15.75,
      changePercent: '0.33',
      volume: 45000000,
      high: 4865.50,
      low: 4835.20,
      open: 4835.20,
      previousClose: 4834.50
    };
  }

  getMockEconomicData() {
    return {
      value: 4.25,
      date: '2024-01-15',
      type: 'Treasury Yield'
    };
  }

  getMockInterestRates() {
    return {
      value: 5.25,
      date: '2024-01-15',
      seriesId: 'FEDFUNDS'
    };
  }

  getMockInflationData() {
    return {
      value: 3.2,
      date: '2024-01-15',
      seriesId: 'CPIAUCSL'
    };
  }

  getMockYahooData() {
    return {
      symbol: 'VNQ',
      price: 85.42,
      change: 1.23,
      changePercent: 1.46,
      volume: 1250000,
      high: 86.15,
      low: 84.20,
      open: 84.19,
      previousClose: 84.19,
      marketCap: 35000000000,
      peRatio: 18.5,
      dividendYield: 3.8
    };
  }

  // Utility methods
  calculateROI(purchasePrice, currentPrice, dividends = 0) {
    const priceChange = currentPrice - purchasePrice;
    const totalReturn = priceChange + dividends;
    return (totalReturn / purchasePrice * 100).toFixed(2);
  }

  calculateYield(annualDividend, currentPrice) {
    return (annualDividend / currentPrice * 100).toFixed(2);
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatPercentage(value) {
    return `${value}%`;
  }
}

export default new FinancialApiService();
