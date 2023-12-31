import React from 'react';
import { createRoot } from 'react-dom/client';

import dayjs from 'dayjs';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { proxyStore } from '../app/redux/proxyStore';
import '../tailwind.css';
dayjs().format()
export default function extensionWrapper(children: React.ReactNode) {
    return createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <Provider store={proxyStore}>
                {children}
            </Provider>
            <ToastContainer position='bottom-center' autoClose={1000} hideProgressBar />
        </React.StrictMode>
    );
}
