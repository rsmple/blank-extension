<template>
  <WListCardField
    :skeleton="skeleton"
    class="
      list:py-4 list:my-1 bg-primary-darkest card:p-4 card:overflow-x-auto h-12 min-h-12 resize-y
      overflow-hidden rounded-lg border border-solid border-gray-200 dark:border-gray-700
    "
  >
    <UserScriptHighlight :model-value="item.script || item.draft" />
  </WListCardField>
</template>

<script lang="ts" setup>
import type {UserScript} from '@/models/UserScript'

import type {FieldProps, ListField} from 'eco-vue-js/dist/components/List/types'

import WListCardField from 'eco-vue-js/dist/components/List/WListCardField.vue'

import UserScriptHighlight from '@/entry/popup/views/UserScript/components/UserScriptHighlight.vue'

defineProps<FieldProps<UserScript>>()

defineEmits<{
  (e: 'update:item', value: UserScript): void
  (e: 'delete:item'): void
}>()
</script>

<script lang="ts">
export const meta = {
  label: 'script',
  cssClass: 'basis-[20rem]',
  title: 'Script',
  allowResize: true,
} as const satisfies ListField<UserScript>
</script>