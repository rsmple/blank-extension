<template>
  <WListCardField
    :skeleton="skeleton"
    allow-open
    class="card:text-xs"
  >
    <template #inner>
      <span
        v-if="card"
        class="list:hidden text-description"
      >{{ meta.title }}:</span> {{ formatDate(item.updated_at) }}
    </template>
  </WListCardField>
</template>

<script lang="ts" setup>
import type {UserScript} from '@/models/UserScript'

import type {FieldProps, ListField} from 'eco-vue-js/dist/components/List/types'

import WListCardField from 'eco-vue-js/dist/components/List/WListCardField.vue'

defineProps<FieldProps<UserScript>>()

defineEmits<{
  (e: 'update:item', value: UserScript): void
  (e: 'delete:item'): void
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<script lang="ts">
export const meta = {
  label: 'updated_at',
  cssClass: 'basis-32',
  title: 'Updated',
  allowResize: false,
} as const satisfies ListField<UserScript>
</script>