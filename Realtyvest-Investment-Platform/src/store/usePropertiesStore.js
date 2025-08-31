import { create } from 'zustand';

export const usePropertiesStore = create((set) => ({
  viewMode: 'grid',
  activeFilter: 'all',
  showFilters: false,
  currentPage: 1,
  propertiesPerPage: 6,
  totalPages: 8,
  setViewMode: (mode) => set({ viewMode: mode }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setShowFilters: (show) => set({ showFilters: show }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));