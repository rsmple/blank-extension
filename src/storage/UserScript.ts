import type {UserScript} from '@/models/UserScript'

const USER_SCRIPTS_KEY = 'user_scripts'
const NEXT_ID_KEY = 'user_scripts_next_id'

export const userScriptStorage = {
  async getAll(): Promise<UserScript[]> {
    return (await chrome.storage.local.get(USER_SCRIPTS_KEY))[USER_SCRIPTS_KEY] || []
  },

  async getById(id: number): Promise<UserScript> {
    const scripts = await this.getAll()
    const value = scripts.find(script => script.id === id)

    if (!value) throw new Error(`UserScript with id ${ id } not found`)

    return value
  },

  async create(payload: UserScript): Promise<UserScript> {
    const scripts = await this.getAll()
    const nextIdResult = await chrome.storage.local.get(NEXT_ID_KEY)
    const nextId = nextIdResult[NEXT_ID_KEY] || 1

    const newScript: UserScript = {
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

    return newScript
  },

  async update(id: number, payload: Partial<Omit<UserScript, 'id' | 'created_at'>>): Promise<UserScript> {
    const scripts = await this.getAll()
    const index = scripts.findIndex(script => script.id === id)

    if (index === -1) throw new Error(`UserScript with id ${ id } not found`)

    scripts[index] = {
      ...scripts[index],
      ...payload,
      updated_at: new Date().toISOString(),
    }

    await chrome.storage.local.set({[USER_SCRIPTS_KEY]: scripts})
    return scripts[index]
  },

  async delete(id: number): Promise<void> {
    const scripts = await this.getAll()
    const index = scripts.findIndex(script => script.id === id)

    if (index === -1) throw new Error(`UserScript with id ${ id } not found`)
    
    scripts.splice(index, 1)

    await chrome.storage.local.set({[USER_SCRIPTS_KEY]: scripts})
  },
}