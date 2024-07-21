<script setup>
import WidgetComponent from '@/components/WidgetComponent.vue'
import { useDashboardStore } from '@/stores/dashboard.js'
import { computed, ref } from 'vue'

const dashboardStore = useDashboardStore()

// Example function to add a widget
function addNewWidget() {
  dashboardStore.addWidget()
}

// Example function to remove a widget
function removeWidget(widgetId) {
  dashboardStore.removeWidget(widgetId)
}

const formValues = ref({
  date: ''
})
function submitHandler() {
  console.log('submitHandler')
  dashboardStore.date = new Date(formValues.value.date)
}

const dashboardDate = computed(() => {
  return dashboardStore.date?.toLocaleDateString() || 'No date selected'
})
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
        v-for="widget in dashboardStore.widgets"
        :key="widget.id"
        :widget="widget"
        @removeWidget="removeWidget(widget.id)"
      />
    </div>
  </main>
</template>
