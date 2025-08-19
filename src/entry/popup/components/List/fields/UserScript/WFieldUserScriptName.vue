<template>
  <WListCardField
    :skeleton="skeleton"
    allow-open
    class="list:py-4 sm-not:text-xs"
  >
    <template #inner>
      <template v-if="item.name">
        {{ item.name }}
      </template>

      <div
        v-else
        class="text-description"
      >
        Untitled Script
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
  label: 'name',
  cssClass: 'basis-40 flex-1',
  title: 'Name',
  allowResize: true,
} as const satisfies ListField<UserScript>
</script>