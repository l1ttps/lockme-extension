import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Welcome from './Welcome';

import { proxyStore } from '../app/redux/proxyStore';
import '../tailwind.css';
proxyStore.ready().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={proxyStore}>
        <Welcome />
      </Provider>
    </React.StrictMode>
  );
})

