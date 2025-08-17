<template>
  <WListCardField :skeleton="skeleton">
    <template #inner>
      <div class="sm-not:text-xs">
        {{ formatDate(item.created_at) }}
      </div>
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
  label: 'created_at',
  cssClass: 'basis-32',
  title: 'Created',
  allowResize: false,
} as const satisfies ListField<UserScript>
</script>