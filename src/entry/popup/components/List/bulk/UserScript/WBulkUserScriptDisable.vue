<template>
  <WButtonSelectionAction
    title="Disable"
    :icon="markRaw(IconToggleOffCircle)"
    :disable-message="disableMessage"
    :disabled="readonly"
    :loading="loading"
    @click="toggle"
  />
</template>

<script lang="ts" setup>
import {markRaw, ref} from 'vue'

import type {BulkProps} from 'eco-vue-js/dist/components/List/types'
import {handleApiError} from 'eco-vue-js/dist/utils/api'

import WButtonSelectionAction from 'eco-vue-js/dist/components/Button/WButtonSelectionAction.vue'

import IconToggleOffCircle from '@popup/assets/icons/IconToggleOffCircle.svg?component'

import {useApiUserScript} from '@/entry/popup/views/UserScript/api/ApiUserScript'

const props = defineProps<BulkProps<QueryParamsBulk>>()

defineEmits<{
  (e: 'clear:selected'): void
}>()

const apiUserScript = useApiUserScript()

const loading = ref(false)

const toggle = () => {
  if (loading.value) return

  loading.value = true

  apiUserScript.bulkUpdate(props.queryParamsGetter(), {is_enabled: false})
    .catch(handleApiError)
    .finally(() => {
      loading.value = false
    })
}
</script>