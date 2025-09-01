import { create } from 'zustand';

export const usePropertiesStore = create((set) => ({
  viewMode: 'grid',
  activeFilter: 'all',
  showFilters: true,
  currentPage: 1,
  propertiesPerPage: 12,  // Changed from 6 to 12 to show all properties
  totalPages: 8,          // Changed from 8 to 1 since all properties fit on one page
  setViewMode: (mode) => set({ viewMode: mode }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setShowFilters: (show) => set({ showFilters: show }),
  setCurrentPage: (page) => set({ currentPage: page }), 
}));