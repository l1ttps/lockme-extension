
import Popup from './Popup';

import { proxyStore } from '../app/redux/proxyStore';
import '../tailwind.css';
import extensionWrapper from '../utils/extensionWrapper';


proxyStore.ready().then(() => {
  extensionWrapper(<Popup />)
})

