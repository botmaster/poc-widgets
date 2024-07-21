<script setup>
import WidgetComponent from '@/components/WidgetComponent.vue'
import { useDashboardStore } from '@/stores/dashboard.store.js'
import { computed, ref } from 'vue'
import { useWidgetsStore } from '@/stores/widgets.store.js'

const dashboardStore = useDashboardStore()
const widgetsStore = useWidgetsStore()

// Example function to add a widget
function addNewWidget() {
  widgetsStore.addWidget()
}

// Example function to remove a widget
function removeWidget(widgetId) {
  widgetsStore.removeWidget(widgetId)
}

const formValues = ref({
  date: dashboardStore.date
})
function submitHandler() {
  console.log('submitHandler')
  dashboardStore.date = formValues.value.date
}

const dashboardDate = computed(() => {
  return new Date(dashboardStore.date).toLocaleDateString() || 'No date selected'
})

// Fetch dashboard data
dashboardStore.fetchData()
</script>

<template>
  <main class="px-12 mt-8">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
    <p>Date: {{ dashboardDate }}</p>

    <div class="mt-6">
      <form action="" @submit.prevent="submitHandler">
        <input type="date" v-model="formValues.date" />
        <button type="submit">Submit</button>
      </form>
    </div>

    <div class="mt-6 mb-4">
      <button @click="addNewWidget">Add Widget</button>
    </div>
    <div class="grid gap-4 grid-cols-2">
      <WidgetComponent
        v-for="widget in widgetsStore.sortedWidgets"
        :key="widget.id"
        :widget="widget"
        @removeWidget="removeWidget(widget.id)"
      />
    </div>
  </main>
</template>
