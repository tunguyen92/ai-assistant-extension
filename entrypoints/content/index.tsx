import '../popup/style.css';
import { CreateContentElement } from './common';
import Header from './common/Header';
import Main from './main';

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
        const promptUi = await createUi(ctx, 'post');
        promptUi.mount();
        // switch (message.action) {
        //   case 'post':
        //     const postUi = await createUi(ctx, 'post');
        //     postUi.mount();
        //     break;
        //   case 'comment':
        //     const commentUi = await createUi(ctx, 'comment');
        //     commentUi.mount();
        //     break;
        //   default:
        //     break;
        // }
      }
    );

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      const activeElement = document.activeElement;

      let selectedText = '';

      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement
      ) {
        selectedText = activeElement.value.substring(
          activeElement.selectionStart || 0,
          activeElement.selectionEnd || 0
        );
      } else {
        selectedText = window.getSelection()?.toString() || '';
      }

      console.log('[Content Script] Selected:', selectedText.trim());
      sendResponse({ selectedText });
    });
  },
});

const createUi = async (ctx: any, message: string) => {
  return createShadowRootUi(ctx, {
    name: 'post-element',
    position: 'inline',
    onMount: (uiContainer, shadow, shadowContainer) => {
      return CreateContentElement(uiContainer, shadowContainer, (root) => {
        const onRemove = () => {
          root?.unmount();
          shadowContainer.remove();
        };
        return <Main onClose={onRemove} />;
      });
    },
    onRemove(root) {
      root?.unmount();
    },
  });
};
