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

    <TransitionGroup class="relative grid gap-4 grid-cols-2" tag="div" name="group-fade">
      <section
        v-for="(widget, index) in widgetsStore.sortedWidgets"
        :key="widget.id"
        :style="{ zIndex: widgetsStore.sortedWidgets.length - index }"
      >
        <WidgetComponent :widget="widget" @removeWidget="removeWidget(widget.id)" />
      </section>
    </TransitionGroup>
  </main>
</template>

<style scoped>
/* 1. declare transition */
.group-fade-move,
.group-fade-enter-active,
.group-fade-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1),
    transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.group-fade-enter-from,
.group-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
  /*transform: translate(-10%, 0);*/
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.group-fade-leave-active {
  position: absolute;
  display: none;
}
</style>
