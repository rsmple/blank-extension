import type {UserScript} from '@/models/UserScript'

import {type MaybeRef, computed, unref} from 'vue'

import {useDefaultQuery, wrapUseQueryPaginated} from 'eco-vue-js/dist/utils/useDefaultQuery'
import {isId} from 'eco-vue-js/dist/utils/utils'

import {userScriptStorage} from '@/storage/UserScript'

/**
 * UserScript
 */

export const QUERY_USER_SCRIPT = 'USER_SCRIPT'

export const useQueryUserScript = (id: MaybeRef<number>) => {
  return useDefaultQuery<UserScript>({
    queryKey: [QUERY_USER_SCRIPT, 'ITEM', id],
    queryFn: () => userScriptStorage.getById(unref(id)).then(response => response.data),

    enabled: computed(() => isId(unref(id))),
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
  })
}

/**
 * UserScriptList
 */

export const useQueryUserScriptList = (options: QueryOptions<UserScript[]> = {}) => {
  return useDefaultQuery<UserScript[]>({
    queryKey: [QUERY_USER_SCRIPT, 'LIST'],
    queryFn: () => userScriptStorage.getAll().then(response => response.data),

    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,

    ...options,
  })
}

export const useQueryUserScriptListPaginated = wrapUseQueryPaginated<UserScript, QueryParamsBulk & {page?: number}>(QUERY_USER_SCRIPT, useQueryUserScriptList)