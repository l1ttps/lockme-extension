
import browser from 'webextension-polyfill';
import store from '../app/redux/store';
import { isDev } from '../shared/utils';
import { LockScreenType } from '../types/types';

store.subscribe(() => {

});


// show welcome page on new install
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    //show the welcome page
    const url = browser.runtime.getURL(isDev ? 'src/options/options.html#/welcome' : 'options.html#/welcome'); // TODO: better approach
    await browser.tabs.create({ url });
  }
});

browser.runtime.onStartup.addListener(async () => {
  // Show the welcome page
  const url = browser.runtime.getURL(isDev ? `src/options/options.html#/lock-screen?type=${LockScreenType.WINDOW}` : `options.html#/lock-screen?type=${LockScreenType.WINDOW}`);
  const windowId = await browser.windows.create({
    url,
    type: "popup",
    state: 'fullscreen'
  })
})
export { };

