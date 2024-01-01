import 'construct-style-sheets-polyfill';
import { debounce } from 'lodash-es';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'webextension-polyfill';
import { proxyStore } from '../app/redux/proxyStore';
import ProtectedScreen from './ProtectedScreen';
import { config, cssom, observe, stringify, twind } from './twind';

proxyStore.ready().then(() => {
    const contentRoot = document.createElement('div');
    contentRoot.id = 'my-extension-root';
    contentRoot.style.display = 'contents';
    document.body.append(contentRoot);

    const shadowRoot = contentRoot.attachShadow({ mode: 'open' });
    const sheet = cssom(new CSSStyleSheet());

    // shadowRoot.adoptedStyleSheet bug in firefox
    // see: https://bugzilla.mozilla.org/show_bug.cgi?id=1827104
    if (navigator?.userAgent.includes('Firefox')) {
        const style = document.createElement('style');
        const debouncedSyncCss = debounce(() => {
            style.textContent += stringify(sheet.target);
        }, 100);

        const originalSheetInsert = sheet.insert;
        (sheet.insert as typeof originalSheetInsert) = (...params) => {
            originalSheetInsert(...params);
            debouncedSyncCss();
        };
        shadowRoot.appendChild(style);
    } else {
        shadowRoot.adoptedStyleSheets = [sheet.target];
    }

    const tw = twind(config, sheet);
    observe(tw, shadowRoot);

    const shadowWrapper = document.createElement('div');
    shadowWrapper.id = 'root';
    shadowWrapper.style.display = 'contents';
    shadowRoot.appendChild(shadowWrapper);

    createRoot(shadowWrapper).render(
        <React.StrictMode>
            <Provider store={proxyStore}>
                <ProtectedScreen />
            </Provider>
        </React.StrictMode>
    );
});