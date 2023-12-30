import { Route, HashRouter as Router, Routes } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import LockScreen from '../app/pages/lock-screen/LockScreen';
import Root from '../app/pages/root/Root';
import Settings from '../app/pages/settings/Settings';
import Welcome from '../app/pages/welcome/Welcome';
import { proxyStore } from '../app/redux/proxyStore';
import '../tailwind.css';
import extensionWrapper from '../utils/extensionWrapper';
proxyStore.ready().then(() => {
  extensionWrapper(<Router>
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/lock-screen" element={<LockScreen />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Router>)
})

