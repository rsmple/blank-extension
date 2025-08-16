# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension that allows users to inject their own custom scripts into any website. Called "Blank Extension" because it doesn't contain predefined scripts - instead, it provides a framework for users to create, manage, and inject their own JavaScript code with immediate live updates.

Built with Vue 3, TypeScript, and Vite. Uses the eco-vue-js framework for ESLint configuration and Tailwind CSS for styling.

## Common Commands

**Development and Build:**
- `npm run build` - Build the extension for production
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint on the codebase
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run zip` - Create a zip file of the dist folder for store submission
- `npm run build:zip` - Build and create zip in one command

## Architecture

**Extension Structure:**
- `src/manifest.ts` - Chrome extension manifest configuration (Manifest V3)
- `src/content.ts` - Content script (currently minimal)
- `src/popup.ts` - Popup script entry point
- `popup.html` - Extension popup HTML
- `src/models.ts` - Shared constants and models
- `src/types.ts` - TypeScript type definitions

**Build System:**
- Uses Vite with a custom plugin (`build/vite-plugin-extension-builder.ts`)
- The plugin dynamically generates `manifest.json` from `src/manifest.ts`
- Outputs to `dist/` folder with Chrome extension structure
- Handles copying static assets from `public/` folder

**Styling:**
- Uses Tailwind CSS with eco-vue-js preset
- Configuration in `tailwind.config.ts`
- PostCSS pipeline includes autoprefixer and postcss-import

**TypeScript Configuration:**
- Main `tsconfig.json` references two project configs:
  - `tsconfig.node.json` - For build tools (Node.js environment)
  - `tsconfig.src.json` - For source code (browser/extension environment)

**Permissions:**
- Current extension has storage permissions and host permissions for all URLs
- Content script runs on all URLs (`<all_urls>`)

## Core Features

**Script Management:**
- Users can create, edit, and manage custom JavaScript scripts
- Each script has the following properties:
  - `is_enabled`: Boolean to enable/disable script execution
  - `script`: The stable version of the script code
  - `draft`: Working version for immediate updates and testing
  - `url_pattern`: URL pattern (supports regex) to determine where script runs
- "Apply Draft" functionality moves draft content to script property for permanent updates

**Admin Panel (Popup):**
- Create new scripts
- View existing scripts in a table format
- Bulk actions for managing multiple scripts
- Live editing with draft/apply workflow
- URL pattern configuration with regex support

**Content Script Injection:**
- Dynamically injects user scripts based on URL patterns
- Supports immediate updates when drafts are applied
- Handles script execution in page context

## Data Structure

**Script Object:**
```typescript
interface UserScript {
  id: string
  name: string
  is_enabled: boolean
  script: string        // Stable version
  draft: string         // Working version
  url_pattern: string   // Regex or glob pattern
  created_at: Date
  updated_at: Date
}
```

## Development Notes

The extension serves as a user script manager and injector. The content script monitors for matching URLs and injects appropriate user scripts. The popup provides a Vue-based admin interface for script management. Chrome storage API is used for persistence.