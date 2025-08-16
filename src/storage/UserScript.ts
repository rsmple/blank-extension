import type {UserScript} from '@/models/UserScript'

const USER_SCRIPTS_KEY = 'user_scripts'
const NEXT_ID_KEY = 'user_scripts_next_id'

export const userScriptStorage = {
  async getAll(): Promise<RequestResponse<UserScript[]>> {
    return {data: (await chrome.storage.local.get(USER_SCRIPTS_KEY))[USER_SCRIPTS_KEY] || []} as RequestResponse<UserScript[]>
  },

  async getById(id: number): Promise<RequestResponse<UserScript>> {
    const scripts = (await this.getAll()).data
    const value = scripts.find(script => script.id === id)

    if (!value) throw new Error(`UserScript with id ${ id } not found`)

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

    if (index === -1) throw new Error(`UserScript with id ${ id } not found`)

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

    if (index === -1) throw new Error(`UserScript with id ${ id } not found`)
    
    scripts.splice(index, 1)

    await chrome.storage.local.set({[USER_SCRIPTS_KEY]: scripts})
  },
}