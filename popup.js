// Medium to Freedium Redirector popup
console.log('Popup loaded');

import StorageService from './services/storageService.js';

class PopupController {
  statusEl;
  toggleEl;

  constructor() {
    this.statusEl = document.getElementById('status');
    this.toggleEl = document.getElementById('enableToggle');

    if (!this.statusEl || !this.toggleEl) {
      throw new Error('Popup HTML is missing required elements');
    }

    this.init();
  }

  async init() {
    const enabled = await StorageService.isEnabled();
    this.toggleEl.checked = enabled;
    this.updateStatusUI(enabled);
    await this.updateTabStatus(enabled);

    this.toggleEl.addEventListener('change', (e) => this.onToggle(e));
  }

  async onToggle(e) {
    const enabled = e.target.checked;
    await StorageService.setEnabled(enabled);
    chrome.runtime.sendMessage({ action: 'toggleExtension', enabled });
    this.updateStatusUI(enabled);
    await this.updateTabStatus(enabled);
  }

  updateStatusUI(enabled) {
    this.statusEl.innerHTML = enabled
      ? '<span class="status-indicator">🟢</span><span>Extension Active</span>'
      : '<span class="status-indicator">🔴</span><span>Extension Disabled</span>';
  }

  async updateTabStatus(enabled) {
    if (!enabled) return;
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) return;
      if (tab.url.includes('freedium.cfd')) {
        this.statusEl.innerHTML = '<span class="status-indicator">🟢</span><span>Currently on Freedium!</span>';
      } else if (tab.url.includes('medium.com')) {
        this.statusEl.innerHTML = '<span class="status-indicator">🟡</span><span>Medium URL detected</span>';
      }
    } catch (err) {
      console.warn('Tab query failed:', err);
    }
  }
}

// Initialize controller
new PopupController(); 