<template>
  <WListCardField>
    <WToggle
      :model-value="item.is_enabled ?? false"
      :disabled="skeleton"
      :readonly="readonly"
      :title="card
        ? item.is_enabled
          ? 'Enabled'
          : 'Disabled'
        : undefined
      "
      right-label
      no-margin
      small
      class="[&>*]:sm-not:py-2 h-full [&>*]:grid [&>*]:h-full [&>*]:items-start [&>*]:py-3.5"
      @update:model-value="toggle"
    />
  </WListCardField>
</template>

<script lang="ts" setup>
import type {UserScript} from '@/models/UserScript'

import {computed, ref} from 'vue'

import type {FieldProps, ListField} from 'eco-vue-js/dist/components/List/types'
import {handleApiError} from 'eco-vue-js/dist/utils/api'

import WListCardField from 'eco-vue-js/dist/components/List/WListCardField.vue'
import WToggle from 'eco-vue-js/dist/components/Toggle/WToggle.vue'

import {useApiUserScript} from '@/entry/popup/views/UserScript/api/ApiUserScript'

const props = defineProps<FieldProps<UserScript>>()

const emit = defineEmits<{
  (e: 'update:item', value: UserScript): void
  (e: 'delete:item'): void
}>()

const apiUserScript = useApiUserScript(computed(() => props.item.id))

const loading = ref(false)

const toggle = (is_enabled: boolean) => {
  if (loading.value) return

  loading.value = true

  apiUserScript.update({is_enabled})
    .then(response => {
      emit('update:item', response.data)
    })
    .catch(error => handleApiError(error, undefined, 'is_enabled'))
    .finally(() => {
      loading.value = false
    })
}
</script>

<script lang="ts">
export const meta = {
  label: 'is_enabled',
  cssClass: 'basis-20',
  title: 'Enabled',
  allowResize: false,
  sticky: true,
} as const satisfies ListField<UserScript>
</script>