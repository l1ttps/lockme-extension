import Browser from "webextension-polyfill";
import { isDev } from "../shared/utils";

export default function getRuntimeUrl(path: string): string {
    return Browser.runtime.getURL(isDev ? `src/options/options.html#/${path}` : `options.html#/${path}`)
}