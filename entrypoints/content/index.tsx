import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './views';

import '../popup/style.css';

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {callback(root)}
      </QueryClientProvider>
    </React.StrictMode>
  );
  return root;
};

const createUi = async (ctx: any, selectedText: string) => {
  return createShadowRootUi(ctx, {
    name: 'post-element',
    position: 'inline',
    onMount: (uiContainer, shadow, shadowContainer) => {
      return CreateContentElement(uiContainer, shadowContainer, (root) => {
        const onRemove = () => {
          root?.unmount();
          shadowContainer.remove();
        };
        return <App onClose={onRemove} selectedText={selectedText} />;
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
        // if (message.action === 'prompt') {
        //   console.log('[ContentScript] received prompt message');

        //   sendResponse({ status: 'UI triggered in if condition' });
        // }

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

        sendResponse({ selectedText });
        sendResponse({ status: 'UI triggered' });

        const promptUi = await createUi(ctx, selectedText);
        promptUi.mount();
      }
    );
  },
});
