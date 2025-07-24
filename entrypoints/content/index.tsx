import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import '../popup/style.css';
import Main from './views';

export const CreateContentElement = (
  uiContainer: HTMLElement,
  shadowContainer: HTMLElement,
  callback: (root: ReactDOM.Root) => React.ReactNode
): ReactDOM.Root => {
  const app = document.createElement('div');
  uiContainer.append(app);

  // const styles = {
  //   visibility: 'visible',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   position: 'fixed',
  //   top: '50%',
  //   bottom: '0',
  //   left: '50%',
  //   right: '0',
  //   width: '50%',
  //   height: '50%',
  //   zIndex: '9999',
  //   backgroundColor: '#000000c2',
  //   transform: 'translate(-50%, -50%)',
  // };

  // Object.assign(uiContainer.style, styles);

  const root = ReactDOM.createRoot(app);
  root.render(
    <React.StrictMode>
      <Toaster />
      {callback(root)}
    </React.StrictMode>
  );
  return root;
};

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
