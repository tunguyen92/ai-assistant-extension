export default defineBackground({
  main() {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        id: 'prompt',
        title: 'EMU Prompt Assistant',
        contexts: ['all'],
      });
    });

    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      chrome.tabs.sendMessage(tab?.id!, { action: 'prompt' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Message failed:', chrome.runtime.lastError.message);
        } else {
          console.info('response', response);
        }
      });
    });
  },
});
