import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

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
