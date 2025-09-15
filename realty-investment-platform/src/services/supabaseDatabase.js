import { supabase, TABLES } from '../lib/supabase'

class SupabaseDatabaseService {
  // Properties
  async getProperties(filters = {}) {
    try {
      let query = supabase.from(TABLES.PROPERTIES).select('*')
      
      if (filters.type) {
        query = query.eq('type', filters.type)
      }
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice)
      }
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice)
      }
      
      const { data, error } = await query
      if (error) throw error
      
      return { success: true, data }
    } catch (error) {
      console.error('Get properties error:', error)
      return { success: false, error: error.message }
    }
  }

  async getPropertyById(id) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PROPERTIES)
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Get property error:', error)
      return { success: false, error: error.message }
    }
  }

  async createProperty(propertyData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PROPERTIES)
        .insert([propertyData])
        .select()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Create property error:', error)
      return { success: false, error: error.message }
    }
  }

  // Investments
  async getUserInvestments(userId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.INVESTMENTS)
        .select(`
          *,
          properties (*)
        `)
        .eq('user_id', userId)
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Get investments error:', error)
      return { success: false, error: error.message }
    }
  }

  async createInvestment(investmentData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.INVESTMENTS)
        .insert([investmentData])
        .select()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Create investment error:', error)
      return { success: false, error: error.message }
    }
  }

  // User Profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USER_PROFILES)
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Get user profile error:', error)
      return { success: false, error: error.message }
    }
  }

  async updateUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USER_PROFILES)
        .upsert([{ user_id: userId, ...profileData }])
        .select()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Update user profile error:', error)
      return { success: false, error: error.message }
    }
  }
}

export default new SupabaseDatabaseService()