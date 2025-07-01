import StorageService from './services/storageService.js';

// Medium to Freedium Redirector Background Script
console.log('🚀 Medium to Freedium Redirector extension loaded with network-level redirects');

// Extension state management
class ExtensionManager {
  static async isEnabled() {
    return StorageService.isEnabled();
  }
  
  static async setEnabled(enabled) {
    await StorageService.setEnabled(enabled);
    
    if (enabled) {
      await this.enableRedirectRules();
    } else {
      await this.disableRedirectRules();
    }
    
    console.log(`Extension ${enabled ? 'enabled' : 'disabled'}`);
    return enabled;
  }
  
  static async enableRedirectRules() {
    try {
      await chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ['medium_redirect_rules']
      });
      console.log('✅ Redirect rules enabled');
    } catch (error) {
      console.error('Error enabling redirect rules:', error);
    }
  }
  
  static async disableRedirectRules() {
    try {
      await chrome.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ['medium_redirect_rules']
      });
      console.log('🔴 Redirect rules disabled');
    } catch (error) {
      console.error('Error disabling redirect rules:', error);
    }
  }
}

// Handle extension installation and updates
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  console.log('📦 Extension installed/updated:', reason);
  
  // Initialize extension state
  const enabled = await ExtensionManager.isEnabled();
  await ExtensionManager.setEnabled(enabled);
  
  if (reason === 'install') {
    console.log('🎉 Welcome! Medium articles will now redirect to Freedium automatically.');
  } else if (reason === 'update') {
    console.log('⬆️ Extension updated with improved redirect performance!');
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'toggleExtension') {
    try {
      await ExtensionManager.setEnabled(request.enabled);
      sendResponse({ success: true });
    } catch (error) {
      console.error('Error toggling extension:', error);
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keep message channel open for async response
});

// Monitor successful redirects for logging (only when enabled)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const enabled = await ExtensionManager.isEnabled();
    
    if (enabled && tab.url.includes('freedium.cfd/https://medium.com')) {
      console.log('✅ Successfully redirected to Freedium:', tab.url);
    }
  }
});

// Utility functions for popup
function isMediumUrl(url) {
  if (!url) return false;
  
  const mediumPatterns = [
    /^https:\/\/medium\.com\//,
    /^https:\/\/[^.]+\.medium\.com\//,
  ];
  
  return mediumPatterns.some(pattern => pattern.test(url));
}

function convertToFreediumUrl(mediumUrl) {
  return `https://freedium.cfd/${mediumUrl}`;
} 