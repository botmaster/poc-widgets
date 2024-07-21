import { defineStore } from 'pinia'

export const useDashboardStore = defineStore({
  id: 'dashboard',
  state: () => ({
    date: new Date(),
    widgets: []
  }),
  actions: {
    addWidget() {
      const newWidget = {
        id: Date.now().toString()
      }
      this.widgets.push(newWidget)
    },
    removeWidget(widgetId) {
      // Filter out the widget by its unique identifier
      this.widgets = this.widgets.filter((w) => w.id !== widgetId)
    }
  }
})
