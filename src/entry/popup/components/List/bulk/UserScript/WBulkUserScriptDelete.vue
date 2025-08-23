<template>
  <WButtonSelectionAction
    title="Delete"
    :icon="markRaw(IconTrash)"
    :disable-message="disableMessage"
    :disabled="readonly"
    @click="openModalDelete"
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

import IconTrash from 'eco-vue-js/dist/assets/icons/sax/IconTrash'

import {useApiUserScript} from '@/entry/popup/views/UserScript/api/ApiUserScript'

const props = defineProps<BulkProps<QueryParamsBulk>>()

const emit = defineEmits<{
  (e: 'clear:selected'): void
}>()

const apiUserScript = useApiUserScript()

let closeModal: (() => void) | null = null

const openModalDelete = () => {
  closeModal?.()

  const count = props.selectionCount

  closeModal = Modal
    .addConfirm(
      {
        title: 'Delete Scripts',
        description: `Are you sure want to delete ${ numberFormatter.format(count) } script${ count === 1 ? '' : 's' }?`,
        acceptText: 'Delete',
        acceptSemanticType: SemanticType.NEGATIVE,
        onAccept: async () => {
          return apiUserScript.bulkDelete(props.queryParamsGetter())
            .then(() => {
              Notify.success({
                title: `Deleted ${ numberFormatter.format(count) } script${ count === 1 ? '' : 's' }`,
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