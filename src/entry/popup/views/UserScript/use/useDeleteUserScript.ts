import {type MaybeRef} from 'vue'

import {Modal} from 'eco-vue-js/dist/utils/Modal'
import {Notify} from 'eco-vue-js/dist/utils/Notify'
import {SemanticType} from 'eco-vue-js/dist/utils/SemanticType'
import {handleApiError} from 'eco-vue-js/dist/utils/api'

import {useApiUserScript} from '../api/ApiUserScript'
import {useQueryUserScript} from '../api/QueryUserScript'

export const useDeleteUserScript = (id: MaybeRef<number>, success?: () => void) => {
  const apiUserScript = useApiUserScript(id)
  const queryUserScript = useQueryUserScript(id)

  let closeModal: (() => void) | null = null

  const deleteItem = () => {
    closeModal?.()

    closeModal = Modal.addConfirm({
      title: 'Delete Script',
      description: `Are you sure you want to delete script "${ queryUserScript.data.value?.name ?? '' }"?`,
      acceptText: 'Delete',
      acceptSemanticType: SemanticType.NEGARIVE,
      onAccept: () => {
        return apiUserScript
          .delete()
          .then(() => {
            success?.()

            Notify.success({
              title: 'Deleted',
              caption: `Deleted script "${ queryUserScript.data.value?.name ?? '' }"`,
            })
          })
          .catch(handleApiError)
      },
    }, () => closeModal = null)
  }

  return {deleteItem}
}