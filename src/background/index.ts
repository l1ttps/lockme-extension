
import browser from 'webextension-polyfill';
import store from '../app/redux/store';
import { isDev } from '../shared/utils';
import { LockScreenType } from '../types/types';

store.subscribe(() => {

});
let lockScreenWindowId: number | undefined
async function openLockScreenWindow() {
  // Show the welcome page
  const url = browser.runtime.getURL(isDev ? `src/options/options.html#/lock-screen?type=${LockScreenType.WINDOW}` : `options.html#/lock-screen?type=${LockScreenType.WINDOW}`);
  const window = await browser.windows.create({
    url,
    type: "popup",
    state: 'fullscreen'
  })
  if (window) {
    lockScreenWindowId = window.id
  }
}

// const state = store.getState();
// show welcome page on new install
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    //show the welcome page
    const url = browser.runtime.getURL(isDev ? 'src/options/options.html#/welcome' : 'options.html#/welcome');
    await browser.tabs.create({ url });
  }
});

browser.runtime.onStartup.addListener(async () => {
  await openLockScreenWindow()
})


// browser.windows.onFocusChanged.addListener(async (window) => {
//   if (lockScreenWindowId) {
//     browser.windows.update(lockScreenWindowId, { focused: true })
//   }
//   // else {
//   //   await openLockScreenWindow()
//   // }
// });
export { };

