class DataService {
  constructor() {
    this.dataCache = null;
  }

  async loadData() {
    if (this.dataCache) {
      return this.dataCache;
    }

    try {
      const response = await fetch('/Data/data.json');
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      this.dataCache = await response.json();
      return this.dataCache;
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  async getProperties(filters = {}) {
    const data = await this.loadData();
    let properties = data.properties;

    // Apply filters
    if (filters.type && filters.type !== 'all') {
      properties = properties.filter(p => p.propertyType === filters.type);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      properties = properties.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.location.toLowerCase().includes(searchTerm) ||
        p.address.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.priceRange) {
      const range = data.priceRanges.find(r => r.id === filters.priceRange);
      if (range) {
        properties = properties.filter(p => {
          const price = p.price;
          return price >= range.min && (range.max === null || price <= range.max);
        });
      }
    }

    if (filters.featured) {
      properties = properties.filter(p => p.isFeatured);
    }

    return properties;
  }

  async getPropertyById(id) {
    const data = await this.loadData();
    return data.properties.find(p => p.id === parseInt(id));
  }

  async getFeaturedProperties() {
    return this.getProperties({ featured: true });
  }

  async getInvestmentMetrics() {
    const data = await this.loadData();
    return data.investmentMetrics;
  }

  async getPropertyTypes() {
    const data = await this.loadData();
    return data.propertyTypes;
  }

  async getPriceRanges() {
    const data = await this.loadData();
    return data.priceRanges;
  }
}

export default new DataService();