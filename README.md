# 📌 Medium to Freedium Redirector

## 🧠 Overview
This Chrome extension automatically redirects any Medium article link (`https://medium.com/*`) to its equivalent `freedium.cfd` version. It enhances accessibility by bypassing paywalls, allowing users to freely read Medium content.

## 🎯 Goal
Seamlessly intercept Medium URLs visited in the browser and redirect them to their Freedium counterparts without user interaction.

## 🔧 Core Functionality
- **Detect** when the user navigates to any Medium article (`https://medium.com/*`)
- **Redirect** the tab to the corresponding `https://freedium.cfd/*` version of the URL
- **Toggle** redirecting on/off directly from the popup (state persists between sessions)
- **Network-level rules** ensure redirects happen instantly, before Medium loads

## 📁 Project Structure

```
freedium-extension/
├── manifest.json              # Extension manifest (MV3)
├── logo.png                   # Toolbar / store icon
├── background.js              # Service-worker (ExtensionManager)
├── rules.json                 # declarativeNetRequest rule set
├── popup.html                 # Popup UI
├── popup.css                  # Popup styles
├── popup.js                   # PopupController (ES module)
├── services/
│   └── storageService.js      # StorageService abstraction
└── README.md                  # Project docs
```

## 🚀 Installation

1. **Clone / Download** this repository
2. Open **Chrome** → `chrome://extensions/`
3. Enable **Developer mode** (top-right)
4. Click **Load unpacked** and select the `freedium-extension` folder
5. Pin the extension → Click the icon → Ensure the toggle is **ON**
6. Visit any Medium article – you will land on the **Freedium** version ✨

## ✨ Features

| Feature | Description |
| ------- | ----------- |
| ⚡ Instant Redirect | Network-level `declarativeNetRequest` rules avoid loading Medium first |
| 🔄 Toggle | Enable / disable redirects from the popup; setting is persisted via `chrome.storage.local` |
| 📝 Status | Popup shows current page state (Freedium, Medium, active, disabled) |
| 🧩 MV3 | Built with Manifest V3 best practices |

## 🛠️ Development Status

- [x] Manifest V3 migration
- [x] Network-level redirect rules (`declarativeNetRequest`)
- [x] Background service-worker with `ExtensionManager`
- [x] Persistent enable/disable toggle (`StorageService`)
- [x] Modular ES-module popup (controller + service)
- [x] Polished UI / UX

## 🔧 Contributing / Local Development

1. Edit code and **save**
2. Refresh the extension from `chrome://extensions/`
3. Open DevTools → *Service Worker* or *Popup* for console logs
4. Test by opening Medium links (emails, search results, etc.)

## 📝 URL Example

```
Medium : https://medium.com/@author/awesome-article-123
Freedium: https://freedium.cfd/https://medium.com/@author/awesome-article-123
```

## ✨ How It Works

1. **URL Detection**: Extension monitors navigation to `https://medium.com/*` URLs
2. **Automatic Redirect**: Instantly redirects to `https://freedium.cfd/[original-medium-url]`
3. **Paywall Bypass**: Users can now read Medium articles freely through Freedium
4. **Transparent Operation**: Works silently in the background

## 🛠️ Development Status

- [x] Basic extension structure created
- [ ] Background service worker implementation
- [ ] URL redirection logic
- [ ] Permissions configuration
- [ ] Testing and optimization

## 🔧 Development

To make changes:
1. Edit the files as needed
2. Go to `chrome://extensions/`
3. Click the refresh button next to your extension
4. Test by visiting Medium articles

## 📝 Usage Examples

**Before**: `https://medium.com/@author/article-title-123abc`
**After**: `https://freedium.cfd/https://medium.com/@author/article-title-123abc`

The extension automatically handles this conversion for any Medium URL you visit! 