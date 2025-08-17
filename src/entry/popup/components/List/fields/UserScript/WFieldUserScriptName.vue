<template>
  <WListCardField
    :skeleton="skeleton"
    allow-open
  >
    <template #inner>
      <div class="text-accent sm-not:text-xs group grid grid-cols-[1fr,auto] items-baseline justify-between gap-x-3 overflow-clip">
        <div
          class="truncate"
          :class="{
            'group-hover:underline': !card,
            'text-description': !item.is_enabled,
          }"
        >
          {{ item.name || 'Untitled Script' }}
        </div>
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