/* eslint-disable no-console */
import {userScriptStorage} from '@/storage/UserScript'

const registeredScriptIds = new Set<string>()

const registerUserScripts = async () => {
  const list = await userScriptStorage.getAll()
  
  // Unregister all existing scripts
  try {
    const existingScripts = await chrome.scripting.getRegisteredContentScripts()
    const scriptIds = existingScripts.map(script => script.id)
    if (scriptIds.length > 0) {
      await chrome.scripting.unregisterContentScripts({ids: scriptIds})
    }
  } catch (error) {
    console.warn('Error unregistering scripts:', error)
  }
  
  registeredScriptIds.clear()

  // Register enabled scripts
  for (const script of list.data) {
    if (!script.is_enabled || !script.script) continue
    
    try {
      const scriptId = `user-script-${ script.id }`
      
      // Use URL pattern directly in matches property
      let matches = ['<all_urls>']
      if (script.url_pattern) {
        matches = [script.url_pattern]
      }
      
      // Wrap user code with error handling
      const wrappedCode = `
        try {
          ${ script.script }
        } catch (e) {
          console.error('User script error:', e);
        }
      `
      
      await chrome.scripting.registerContentScripts([{
        id: scriptId,
        js: [wrappedCode],
        matches: matches,
        runAt: 'document_end',
        world: 'MAIN',
      }])
      
      registeredScriptIds.add(scriptId)
      console.log(`✅ Successfully registered script: ${ scriptId }`, {
        matches,
        scriptLength: script.script.length,
      })
    } catch (error) {
      console.error(`Error registering script ${ script.id }:`, error)
    }
  }
  
  // Verify registration status
  try {
    const registeredScripts = await chrome.scripting.getRegisteredContentScripts()
    console.log(`📊 Registration summary:`, {
      totalRequested: list.data.filter(s => s.is_enabled && s.script).length,
      actuallyRegistered: registeredScripts.length,
      registeredIds: registeredScripts.map(s => s.id),
    })
  } catch (error) {
    console.error('Error verifying registrations:', error)
  }
}

// Listen for storage changes to re-register scripts
chrome.storage.onChanged.addListener(async (changes, areaName) => {
  if (areaName === 'local' && changes.userScripts) {
    await registerUserScripts()
  }
})

// Handle messages from content script
chrome.runtime.onMessage.addListener(async (message) => {
  if (message.action === 'executeUserScripts') {
    await registerUserScripts()
  }
})

// Register scripts on startup
registerUserScripts()