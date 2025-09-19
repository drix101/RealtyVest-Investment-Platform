import { create } from 'zustand';

export const usePropertiesStore = create((set) => ({
  viewMode: 'grid',
  activeFilter: 'all',
  showFilters: true,
  currentPage: 1,
  propertiesPerPage: 6,   // Updated to show 8 properties per page
  totalPages: 12,          // This will be calculated dynamically in the component
  setViewMode: (mode) => set({ viewMode: mode }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setShowFilters: (show) => set({ showFilters: show }),
  setCurrentPage: (page) => set({ currentPage: page }), 
}));