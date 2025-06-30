// services/storageService.js
// A lightweight wrapper around chrome.storage.local for extension state

export default class StorageService {
  static KEY_ENABLED = 'extensionEnabled';

  /**
   * Returns the current enabled flag (true by default).
   */
  static async isEnabled() {
    const { [this.KEY_ENABLED]: enabled = true } = await chrome.storage.local.get({ [this.KEY_ENABLED]: true });
    return enabled;
  }

  /**
   * Persists the enabled flag.
   */
  static async setEnabled(enabled) {
    await chrome.storage.local.set({ [this.KEY_ENABLED]: enabled });
    return enabled;
  }
} 