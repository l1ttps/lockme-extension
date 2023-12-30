import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { proxyStore } from '../app/redux/proxyStore';
import '../tailwind.css';

proxyStore.ready().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={proxyStore}>
        <Popup />
      </Provider>
      <ToastContainer position='bottom-center' autoClose={1000} hideProgressBar />
    </React.StrictMode>
  );
})