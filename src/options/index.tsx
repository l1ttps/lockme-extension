import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LockScreen from '../app/pages/lock-screen/LockScreen';
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
            <Route path="/lock-screen" element={<LockScreen />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </Provider>
      <ToastContainer position='bottom-center' autoClose={1000} hideProgressBar />
    </React.StrictMode>
  );
})