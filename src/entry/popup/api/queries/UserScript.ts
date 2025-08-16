import type {UserScript} from '@/models/UserScript'

import {type MaybeRef, computed, unref} from 'vue'

import {useDefaultQuery} from 'eco-vue-js/dist/utils/useDefaultQuery'
import {isId} from 'eco-vue-js/dist/utils/utils'

/**
 * UserScript
 */

export const QUERY_USER_SCRIPT = 'USER_SCRIPT'

export const useQueryUserScript = (id: MaybeRef<number>) => {
  return useDefaultQuery<UserScript>({
    queryKey: [QUERY_USER_SCRIPT, 'ITEM', id],
    queryFn: () => ({
      id: unref(id),
      name: `Script ${ unref(id) }`,
      is_enabled: true,
      script: '',
      draft: '',
      url_pattern: `https://some-site.empty/page-${ unref(id) }/index.php`,
      created_at: new Date(),
      updated_at: new Date(),
    }),

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
    queryFn: () => Array(15).fill(null).map((_, index) => ({
      id: index + 1,
      name: `Script ${ index + 1 }`,
      is_enabled: true,
      script: '',
      draft: '',
      url_pattern: `https://some-site.empty/page-${ index + 1 }/index.php`,
      created_at: new Date(),
      updated_at: new Date(),
    })),

    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,

    ...options,
  })
}
