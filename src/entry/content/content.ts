// Content script now just triggers the background script to execute user scripts
// The actual script execution is handled by the background script using chrome.scripting.executeScript

// Request background script to execute user scripts when page loads
// chrome.runtime.sendMessage({action: 'executeUserScripts'})

// // Listen for storage changes and request re-execution
// chrome.storage.onChanged.addListener((changes, areaName) => {
//   if (areaName === 'local' && changes.userScripts) {
//     chrome.runtime.sendMessage({action: 'executeUserScripts'})
//   }
// })
