import {type MaybeRef, unref} from 'vue'

import {Modal} from 'eco-vue-js/dist/utils/Modal'
import {Notify} from 'eco-vue-js/dist/utils/Notify'
import {SemanticType} from 'eco-vue-js/dist/utils/SemanticType'
import {handleApiError} from 'eco-vue-js/dist/utils/api'

import {useApiUserScript} from '../api/ApiUserScript'

export const useDeleteUserScript = (id: MaybeRef<number>, success?: () => void) => {
  const apiUserScript = useApiUserScript(id)

  let closeModal: (() => void) | null = null

  const deleteItem = () => {
    closeModal?.()

    const idValue = unref(id)

    closeModal = Modal.addConfirm({
      title: 'Delete Script',
      description: `Are you sure you want to delete script ${ idValue }?`,
      acceptText: 'Delete',
      acceptSemanticType: SemanticType.NEGARIVE,
      onAccept: () => {
        return apiUserScript
          .delete()
          .then(() => {
            success?.()

            Notify.success({
              title: 'Deleted',
              caption: `Deleted script ${ idValue }`,
            })
          })
          .catch(handleApiError)
      },
    }, () => closeModal = null)
  }

  return {deleteItem}
}