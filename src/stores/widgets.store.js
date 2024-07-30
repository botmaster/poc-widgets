import { acceptHMRUpdate, defineStore } from 'pinia'

/**
 * Widgets store
 */
export const useWidgetsStore = defineStore({
  id: 'widgetsStore',
  state: () => ({
    widgets: []
  }),
  getters: {
    // Sorted by creation date descending
    sortedWidgets() {
      return this.widgets.sort((a, b) => b.createdAt - a.createdAt)
    }
  },
  actions: {
    addWidget() {
      const newWidget = {
        id: new Date().getTime(),
        createdAt: new Date().getTime()
      }
      this.widgets.push(newWidget)
    },
    removeWidget(widgetId) {
      // Filter out the widget by its unique identifier
      this.widgets = this.widgets.filter((w) => w.id !== widgetId)

      // Get all localstorage keys who begin with `widget-${widgetId}`
      const keys = Object.keys(localStorage).filter((key) => key.startsWith(`__persisted__widget-`))

      // Remove localstorage keys === `__persisted__widget-${widgetId}-store`
      keys.forEach((key) => {
        if (key.startsWith(`__persisted__widget-${widgetId}`)) {
          console.log('removing key', key)
          localStorage.removeItem(key)
        }
      })
    }
  },
  persist: {
    enabled: true,
    paths: ['widgets']
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWidgetsStore, import.meta.hot))
}
