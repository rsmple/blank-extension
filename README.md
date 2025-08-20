# Blank Extension

A Chrome extension that allows you to inject custom JavaScript into any website. Create, manage, and execute your own user scripts with live editing capabilities.

## Features

- **Custom Script Injection**: Write and inject JavaScript code into any website
- **Live Draft System**: Test changes instantly with the draft mode before applying permanently  
- **URL Pattern Matching**: Control which websites your scripts run on using regex patterns
- **Script Management**: Create, edit, enable/disable, and organize multiple scripts
- **Bulk Operations**: Manage multiple scripts at once with bulk actions

## How to Use

1. **Creating Your First Script:**
   - Click the Blank Extension icon in your Chrome toolbar
   - Click "Create Script" to add a new user script
   - Enter a name for your script
   - Set the URL pattern (e.g., `.*github\.com.*` for GitHub pages)
   - Write your JavaScript code in the script field
   - Enable the script to activate it

2. **Draft and Apply Workflow:**
   - Edit scripts in the "Draft" field to test changes immediately
   - Changes in draft are applied instantly to matching pages
   - Use "Apply Draft" to save changes to the stable script version
   - The stable script persists and runs on page loads

3. **URL Pattern Examples:**
   - `.*` - Runs on all websites
   - `.*github\.com.*` - Runs on all GitHub pages
   - `^https://example\.com/.*` - Runs only on HTTPS pages of example.com
   - `.*\.(js|css)$` - Runs on pages ending in .js or .css

4. **Managing Scripts:**
   - View all scripts in the popup interface
   - Use bulk actions to enable/disable/delete multiple scripts
   - Toggle individual scripts on/off as needed

## Installation

### Method 1: Chrome Web Store (Recommended)

The easiest and recommended way to install Blank Extension is directly from the Chrome Web Store! This ensures you get automatic updates.

� **[Install Blank Extension from the Chrome Web Store](#)** *(Coming Soon)*

Simply click the link above and then click "Add to Chrome". You're all set!

### Method 2: Manual Installation

1. **Download or Clone:**
   - Clone the repo: `git clone https://github.com/rsmple/blank-extension.git`
   - OR [Download the ZIP](https://github.com/rsmple/blank-extension/archive/refs/heads/main.zip) and extract it.

2. **Build the Extension:**
   - Navigate to the project directory: `cd blank-extension`
   - Install dependencies: `npm ci`
   - Build the project: `npm run build`
   - This will create a `dist` folder with the packaged extension

3. **Load into Chrome:**
   - Open Chrome and go to `chrome://extensions`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `dist` folder (the one created by `npm run build`)

4. **Pin It!** (Optional, but Recommended):
   - Click the puzzle piece icon (Extensions) in your Chrome toolbar
   - Find "Blank Extension" and click the pin icon next to it for easy access

## Permissions

This extension requires:
- **storage** - To save user scripts locally
- **scripting** - To inject scripts into web pages  
- **host_permissions** (`<all_urls>`) - To run scripts on any website

## Important Note

This extension manipulates web page content by injecting custom JavaScript. **Use responsibly and only inject scripts you trust.** Scripts have access to the full context of the web pages they run on.

---

Enjoy creating your custom web experiences!