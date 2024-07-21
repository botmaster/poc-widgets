import { defineStore } from 'pinia'
//import axios from 'axios'

// Création d'un store avec un ID dynamique
export function createDynamicWidgetStore(id) {
  return defineStore(`widget-${id}`, {
    state: () => ({
      id,
      stats: {},
      formSetup: {
        fields: []
      },
      types: [],
      metrics: [],
      groupsBy: []
    }),
    getters: {
      getFields() {
        return this.formSetup.fields
      }
    },
    actions: {
      async fetchFormSetup() {
        if (this.formSetup.fields.length) {
          return
        }

        // Fetch all data in parallel
        await Promise.all([this.fetchTypes(), this.fetchMetrics(), this.fetchGroupsBy()])

        this.formSetup = {
          fields: [
            {
              name: 'date',
              type: 'date',
              label: 'Date',
              value: new Date().toISOString().substr(0, 10)
            },
            {
              name: 'type',
              type: 'select',
              label: 'Type',
              options: this.types,
              value: ''
            },
            {
              name: 'metric',
              type: 'select',
              label: 'Metric',
              options: this.metrics,
              value: ''
            },
            {
              name: 'groupBy',
              type: 'select',
              label: 'Group by',
              options: this.groupsBy,
              value: ''
            }
          ]
        }
      },

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

      fetchStats(payload) {
        // Store user input
        this.formSetup.fields.forEach((field) => {
          field.value = payload[field.name]
        })

        // Fake real api call with a timeout
        return new Promise((resolve) =>
          setTimeout(() => {
            this.stats = {
              type: payload.type,
              metric: payload.metric,
              groupBy: payload.groupBy,
              data: [
                { name: 'Data 1', value: 10 },
                { name: 'Data 2', value: 20 },
                { name: 'Data 3', value: 30 }
              ]
            }
            resolve()
          }, Math.random() * 1000)
        )
      }
    },
    persist: true
  })()
}
