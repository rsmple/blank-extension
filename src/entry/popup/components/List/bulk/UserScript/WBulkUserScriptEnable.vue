<template>
  <WButtonSelectionAction
    title="Enable"
    :icon="markRaw(IconToggleOnCircle)"
    :disable-message="disableMessage"
    :disabled="readonly"
    @click="openModal"
  />
</template>

<script lang="ts" setup>
import {markRaw} from 'vue'

import type {BulkProps} from 'eco-vue-js/dist/components/List/types'
import {Modal} from 'eco-vue-js/dist/utils/Modal'
import {Notify} from 'eco-vue-js/dist/utils/Notify'
import {SemanticType} from 'eco-vue-js/dist/utils/SemanticType'
import {handleApiError} from 'eco-vue-js/dist/utils/api'
import {numberFormatter} from 'eco-vue-js/dist/utils/utils'

import WButtonSelectionAction from 'eco-vue-js/dist/components/Button/WButtonSelectionAction.vue'

import IconToggleOnCircle from '@popup/assets/icons/IconToggleOnCircle.svg?component'

import {useApiUserScript} from '@/entry/popup/views/UserScript/api/ApiUserScript'

const props = defineProps<BulkProps<QueryParamsBulk>>()

const emit = defineEmits<{
  (e: 'clear:selected'): void
}>()

const apiUserScript = useApiUserScript()

let closeModal: (() => void) | null = null

const openModal = () => {
  closeModal?.()

  const count = props.selectionCount

  closeModal = Modal
    .addConfirm(
      {
        title: 'Enable Scripts',
        description: `Are you sure want to enable ${ numberFormatter.format(count) } script${ count === 1 ? '' : 's' }?`,
        acceptText: 'Enable',
        acceptSemanticType: SemanticType.PRIMARY,
        onAccept: async () => {
          return apiUserScript.bulkUpdate(props.queryParamsGetter(), {is_enabled: true})
            .then(() => {
              Notify.success({
                title: 'Success',
                caption: `Enabled ${ numberFormatter.format(count) } script${ count === 1 ? '' : 's' }`,
              })
              emit('clear:selected')
            })
            .catch(handleApiError)
        },
      },
      () => closeModal = null,
    )
}
</script>