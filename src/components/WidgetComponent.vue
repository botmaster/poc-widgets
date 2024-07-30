<script setup>
import { createDynamicWidgetStore } from '@/stores/widget.store.js'
import { onMounted, onUnmounted, reactive } from 'vue'
import WidgetSelectionComponent from '@/components/WidgetSelectionComponent.vue'

const props = defineProps({
  widget: Object
})

const widgetStore = createDynamicWidgetStore(
  props.widget?.id ? props.widget.id : Math.random().toString(36).substring(7)
)

const emit = defineEmits(['removeWidget'])

const form = reactive({})

onMounted(async () => {
  // Fetch form setup
  await widgetStore.fetchFormSetup()

  // Local form state
  widgetStore.getFields.forEach((field) => {
    form[field.name] = {
      ...field
    }
  })
})

const submitHandler = () => {
  widgetStore.fetchStats({
    type: form.type.value,
    metric: form.metric.value,
    groupBy: form.groupBy.value,
    date: form.date.value
  })
}

onUnmounted(() => {
  console.log('Unmounted', widgetStore.id)
  widgetStore.$reset()
  widgetStore.$dispose()
})

const clickRemoveHandler = () => {
  emit('removeWidget', widgetStore.id)
}
</script>

<template>
  <div class="bg-blue-100 px-4 py-2.5 rounded aspect-video overflow-hidden flex flex-col">
    <div class="text-xs flex justify-end">
      <button @click="clickRemoveHandler">X</button>
    </div>
    <div>
      <WidgetSelectionComponent :model-value="form" @submit="submitHandler" />
    </div>
    <div class="overflow-auto mt-4">
      <pre class="text-xs">{{ widgetStore.stats }}</pre>
    </div>

    <div class="mt-auto text-xs text-gray-500">
      <p class="flex">
        <span class="mr-auto">WidgetComponent</span><span>{{ props.widget.id }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
