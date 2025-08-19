<template>
  <WListCardField
    :skeleton="skeleton"
    class="
      list:py-3 list:my-1 card:overflow-x-auto relative
      overflow-hidden rounded-lg border-solid border-gray-200 dark:border-gray-700
    "
    :class="{
      'bg-primary-darkest card:p-4 h-12 min-h-12 resize-y border': isSet,
    }"
  >
    <template v-if="isSet">
      <div
        class="bg-default dark:bg-default-dark text-2xs absolute left-0 top-0 rounded-br pl-[inherit] pr-1 font-bold"
        :class="{
          'text-positive dark:text-positive-dark': isApplied,
          'text-description': !isApplied,
        }"
      >
        {{ isApplied ? 'Applied' : 'Draft' }}
      </div>

      <UserScriptHighlight :model-value="item.draft" />
    </template>

    <div
      v-else
      class="text-description"
    >
      No script
    </div>
  </WListCardField>
</template>

<script lang="ts" setup>
import type {UserScript} from '@/models/UserScript'

import {computed} from 'vue'

import type {FieldProps, ListField} from 'eco-vue-js/dist/components/List/types'

import WListCardField from 'eco-vue-js/dist/components/List/WListCardField.vue'

import UserScriptHighlight from '@/entry/popup/views/UserScript/components/UserScriptHighlight.vue'

const props = defineProps<FieldProps<UserScript>>()

defineEmits<{
  (e: 'update:item', value: UserScript): void
  (e: 'delete:item'): void
}>()

const isSet = computed(() => !!props.item.script || !!props.item.draft)
const isApplied = computed(() => props.item.draft === props.item.script)
</script>

<script lang="ts">
export const meta = {
  label: 'script',
  cssClass: 'basis-[20rem]',
  title: 'Script',
  allowResize: true,
} as const satisfies ListField<UserScript>
</script>