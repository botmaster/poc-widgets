<script setup>
import { createDynamicWidgetStore } from '@/stores/widget.store.js'
import { onMounted, reactive } from 'vue'

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

const clickRemoveHandler = () => {
  emit('removeWidget', widgetStore.id)
}
</script>

<template>
  <div class="bg-blue-100 px-2 py-1.5 rounded aspect-video">
    <h2 class="flex">
      <span class="mr-auto">WidgetComponent</span> <span>{{ props.widget.id }}</span>
    </h2>
    <form @submit.prevent="submitHandler">
      <div class="flex flex-wrap gap-2.5">
        <div class="flex gap-1.5" v-for="item in form" :key="item.name">
          <template v-if="item.type === 'select'">
            <label>{{ item.label }}</label>
            <select v-model="item.value">
              <option value="" disabled>Select an option</option>
              <option v-for="(option, index) in item.options" :key="index" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </template>
          <template v-else>
            <label>{{ item.label }}</label>
            <input :type="item.type" v-model="item.value" />
          </template>
        </div>
        <button type="submit">Fetch</button>
      </div>
    </form>
    <pre class="max-h-32 overflow-auto text-xs">{{ widgetStore.stats }}</pre>
    <button @click="clickRemoveHandler">Remove Widget</button>
  </div>
</template>

<style scoped></style>
