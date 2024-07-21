<script setup>
const model = defineModel()
const emit = defineEmits(['submit'])

const submitHandler = () => {
  emit('submit', model)
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div class="flex flex-wrap gap-2.5">
      <div class="flex gap-1.5" v-for="item in model" :key="item.name">
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
</template>

<style scoped></style>
