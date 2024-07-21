import { defineStore } from 'pinia'

export const useDashboardStore = defineStore({
  id: 'dashboard',
  state: () => ({
    date: new Date()
  }),
  actions: {},
  persist: {
    enabled: true
  }
})
