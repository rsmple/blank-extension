<template>
  <WListCardField
    :skeleton="skeleton"
    allow-open
  >
    <template #inner>
      <div class="text-default sm-not:text-xs truncate">
        {{ item.url_pattern || 'No pattern set' }}
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
</script>

<script lang="ts">
export const meta = {
  label: 'url_pattern',
  cssClass: 'basis-60 flex-1',
  title: 'URL Pattern',
  allowResize: true,
} as const satisfies ListField<UserScript>
</script>