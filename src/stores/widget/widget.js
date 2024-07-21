import { defineStore } from 'pinia'
import { useDashboardStore } from '@/stores/dashboard.js'
//import axios from 'axios'

// Création d'un store avec un ID dynamique
export function createDynamicWidgetStore(id) {
  return defineStore(`widget-${id}-store`, {
    state: () => ({
      id,
      stats: {},
      formSetup: {
        fields: []
      }
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
        //await Promise.all([this.fetchTypes(), this.fetchMetrics(), this.fetchGroupsBy()])

        const dashboardStore = useDashboardStore()

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
              options: dashboardStore.types,
              value: ''
            },
            {
              name: 'metric',
              type: 'select',
              label: 'Metric',
              options: dashboardStore.metrics,
              value: ''
            },
            {
              name: 'groupBy',
              type: 'select',
              label: 'Group by',
              options: dashboardStore.groupsBy,
              value: ''
            }
          ]
        }
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
