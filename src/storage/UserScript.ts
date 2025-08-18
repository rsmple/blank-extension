import type {UserScript} from '@/models/UserScript'

const USER_SCRIPTS_KEY = 'user_scripts'
const NEXT_ID_KEY = 'user_scripts_next_id'

const createApiError = (detail: string) => new Error(detail)

export const userScriptStorage = {
  async getAll(): Promise<RequestResponse<UserScript[]>> {
    return {data: (await chrome.storage.local.get(USER_SCRIPTS_KEY))[USER_SCRIPTS_KEY] || []} as RequestResponse<UserScript[]>
  },

  async getById(id: number): Promise<RequestResponse<UserScript>> {
    const scripts = (await this.getAll()).data
    const value = scripts.find(script => script.id === id)

    if (!value) return Promise.reject(createApiError(`UserScript with id ${ id } not found`))

    return {data: value} as RequestResponse<UserScript>
  },

  async create(payload: Partial<UserScript>): Promise<RequestResponse<UserScript>> {
    const scripts = (await this.getAll()).data
    const nextIdResult = await chrome.storage.local.get(NEXT_ID_KEY)
    const nextId = nextIdResult[NEXT_ID_KEY] || 1

    const newScript: UserScript = {
      name: '',
      is_enabled: true,
      script: '',
      draft: '',
      url_pattern: '',
      ...payload,
      id: nextId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    scripts.push(newScript)
    
    await chrome.storage.local.set({
      [USER_SCRIPTS_KEY]: scripts,
      [NEXT_ID_KEY]: nextId + 1,
    })

    return {data: newScript} as RequestResponse<UserScript>
  },

  async update(id: number, payload: Partial<UserScript>): Promise<RequestResponse<UserScript>> {
    const scripts = (await this.getAll()).data
    const index = scripts.findIndex(script => script.id === id)

    if (index === -1) return Promise.reject(createApiError(`UserScript with id ${ id } not found`))

    scripts[index] = {
      ...scripts[index],
      ...payload,
      updated_at: new Date().toISOString(),
    }

    await chrome.storage.local.set({[USER_SCRIPTS_KEY]: scripts})
    return {data: scripts[index]} as RequestResponse<UserScript>
  },

  async delete(id: number): Promise<void> {
    const scripts = (await this.getAll()).data
    const index = scripts.findIndex(script => script.id === id)

    if (index === -1) return Promise.reject(createApiError(`UserScript with id ${ id } not found`))
    
    scripts.splice(index, 1)

    await chrome.storage.local.set({[USER_SCRIPTS_KEY]: scripts})
  },

  async bulkUpdate(queryParams: QueryParamsBulk, payload: Partial<UserScript>): Promise<void> {
    const scripts = (await this.getAll()).data

    for (const item of scripts) {
      if (queryParams.slice_indexes) {
        const index = scripts.indexOf(item)
        if (index < queryParams.slice_indexes[0] || index > queryParams.slice_indexes[1]) return
      } else if (queryParams.id__in) {
        if (!queryParams.id__in?.includes(item.id)) return
      } else if (queryParams.id__not_in) {
        if (queryParams.id__not_in?.includes(item.id)) return
      }

      Object.assign(item, payload)
    }

    await chrome.storage.local.set({[USER_SCRIPTS_KEY]: scripts})
  },

  async bulkDelete(queryParams: QueryParamsBulk): Promise<void> {
    let scripts = (await this.getAll()).data

    if (queryParams.slice_indexes) {
      scripts.splice(queryParams.slice_indexes[0], queryParams.slice_indexes[1])
    } else if (queryParams.id__in) {
      scripts = scripts.filter(item => !queryParams.id__in?.includes(item.id))
    } else if (queryParams.id__not_in) {
      scripts = scripts.filter(item => queryParams.id__not_in?.includes(item.id))
    } else {
      scripts = []
    }

    await chrome.storage.local.set({[USER_SCRIPTS_KEY]: scripts})
  },
}