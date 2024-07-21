import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDashboardStore = defineStore({
  id: 'dashboardStore',
  state: () => ({
    date: new Date().toISOString().substr(0, 10),
    types: [],
    metrics: [],
    groupsBy: []
  }),
  actions: {
    async fetchTypes() {
      /*axios.get('/types').then((response) => {
        this.types = response.data
      })*/
      // Fake real api call with a timeout
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000))
      this.types = [
        { label: 'Type 1', value: 'type1' },
        { label: 'Type 2', value: 'type2' }
      ]
    },

    async fetchMetrics() {
      /*axios.get('/metrics').then((response) => {
        this.metrics = response.data
      })*/
      // Fake real api call with a timeout
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000))
      this.metrics = [
        { label: 'Metric 1', value: 'metric1' },
        { label: 'Metric 2', value: 'metric2' }
      ]
    },

    async fetchGroupsBy() {
      /*axios.get('/groupsBy').then((response) => {
        this.groupsBy = response.data
      })*/
      // Fake real api call with a timeout
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000))
      this.groupsBy = [
        { label: 'Group 1', value: 'group1' },
        { label: 'Group 2', value: 'group2' }
      ]
    },

    async fetchData() {
      // Fetch all data in parallel
      await Promise.all([this.fetchTypes(), this.fetchMetrics(), this.fetchGroupsBy()])
    }
  },
  persist: {
    enabled: true
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
}
