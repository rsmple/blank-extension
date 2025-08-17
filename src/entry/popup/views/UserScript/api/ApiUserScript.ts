import type {UserScript} from '@/models/UserScript'

import {useQueryClient} from '@tanstack/vue-query'
import {type MaybeRef, unref} from 'vue'

import {useQueryUpdater} from 'eco-vue-js/dist/utils/useQueryUpdater'
import {isId} from 'eco-vue-js/dist/utils/utils'

import {userScriptStorage} from '@/storage/UserScript'

import {QUERY_USER_SCRIPT} from './QueryUserScript'

export const useApiUserScript = (id?: MaybeRef<number | undefined>) => {
  const queryClient = useQueryClient()
  const queryUpdater = useQueryUpdater()

  const update = (payload: Parameters<typeof userScriptStorage.update>[1]) => {
    if (!isId(unref(id))) return Promise.reject()

    return userScriptStorage
      .update(unref(id) as number, payload)
      .then(response => {
        queryUpdater.update(response.data, {listQueryFilter: {queryKey: [QUERY_USER_SCRIPT, 'LIST']}})

        return response
      })
  }

  const create = (payload: Parameters<typeof userScriptStorage.create>[0]) => {
    return userScriptStorage
      .create(payload)
      .then(response => {
        queryClient.refetchQueries({queryKey: [QUERY_USER_SCRIPT]})

        return response
      })
  }

  const createOrUpdate = (payload: Partial<UserScript>) => {
    return isId(unref(id)) ? update(payload) : create(payload)
  }

  const deleteItem = () => {
    if (!isId(unref(id))) return Promise.reject()

    return userScriptStorage.delete(unref(id) as number)
      .then(response => {
        queryClient.refetchQueries({queryKey: [QUERY_USER_SCRIPT]})

        return response
      })
  }

  const bulkUpdate = (params: QueryParamsBulk, payload: Partial<UserScript>) => {
    return userScriptStorage.bulkUpdate(params, payload)
      .then(response => {
        queryClient.refetchQueries({queryKey: [QUERY_USER_SCRIPT]})

        return response
      })
  }

  const bulkDelete = (params: QueryParamsBulk) => {
    return userScriptStorage.bulkDelete(params)
      .then(response => {
        queryClient.refetchQueries({queryKey: [QUERY_USER_SCRIPT]})

        return response
      })
  }

  return {
    update,
    create,
    createOrUpdate,
    delete: deleteItem,
    bulkUpdate,
    bulkDelete,
  }
}
