export default defineBackground({
  main() {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        id: 'prompt',
        title: 'EMU Prompt Assistant',
        contexts: ['all'],
      });
      // chrome.contextMenus.create({
      //   id: 'comment',
      //   title: 'Comment Insight',
      //   contexts: ['all'],
      // });
    });

    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      chrome.tabs.sendMessage(
        tab?.id!,
        { action: 'prompt' },
        function (response: any) {
          console.info('response', response);
        }
      );
    });
    // chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    //   if (info.menuItemId === 'post') {
    //     chrome.tabs.sendMessage(
    //       tab?.id!,
    //       { action: 'post' },
    //       function (response: any) {
    //         console.info('response', response);
    //       }
    //     );
    //   }
    // });
    // chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    //   if (info.menuItemId === 'comment') {
    //     chrome.tabs.sendMessage(
    //       tab?.id!,
    //       { action: 'comment' },
    //       function (response: any) {
    //         console.info('response', response);
    //       }
    //     );
    //   }
    // });
  },
});
