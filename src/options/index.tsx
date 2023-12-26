import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { Provider } from 'react-redux';
import Root from '../app/pages/root/Root';
import Settings from '../app/pages/settings/Settings';
import Welcome from '../app/pages/welcome/Welcome';
import { proxyStore } from '../app/redux/proxyStore';
import '../tailwind.css';
proxyStore.ready().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={proxyStore}>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>
  );
})