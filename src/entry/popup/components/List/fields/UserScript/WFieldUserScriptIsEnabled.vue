<template>
  <WListCardField :skeleton="skeleton">
    <template #inner>
      <div class="flex items-center">
        <div
          class="mr-2 size-2 rounded-full"
          :class="{
            'bg-green-500': item.is_enabled,
            'bg-gray-400': !item.is_enabled,
          }"
        />
        <span class="text-default sm-not:text-xs">
          {{ item.is_enabled ? 'Enabled' : 'Disabled' }}
        </span>
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
  label: 'is_enabled',
  cssClass: 'basis-24',
  title: 'Enabled',
  allowResize: false,
} as const satisfies ListField<UserScript>
</script>