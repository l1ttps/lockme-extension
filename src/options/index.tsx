import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { Provider } from 'react-redux';
import Welcome from '../app/pages/Welcome';
import { proxyStore } from '../app/redux/proxyStore';
import '../tailwind.css';
proxyStore.ready().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={proxyStore}>
        <Router>
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>
  );
})