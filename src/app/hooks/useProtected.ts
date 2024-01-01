import { useEffect, useState } from "react"
import Browser from "webextension-polyfill"
import { useAppSelector } from "../redux/hooks"
import { TabsProtectState } from "../redux/slices/tabsProtect"

/**
 * Retrieves the protected state of the current tab and its hostname.
 *
 * @return {{ hostname: string, isProtected: boolean }} - An object containing the hostname of the current tab and a boolean indicating whether it is protected.
 */
export default function useProtected() {
    const tabsProtect: TabsProtectState[] = useAppSelector(state => state.tabsProtect)
    const [hostname, setHostname] = useState<string>("")
    const [isProtected, setIsProtected] = useState(false)

    useEffect(() => {
        (async () => {
            Browser.tabs.query({ active: true }).then(tabs => {
                const currentTab = tabs[0]
                if (currentTab.url) {
                    const hostname = new URL(currentTab.url).hostname
                    setIsProtected(tabsProtect.some((tab) => tab.hostname === hostname))
                    setHostname(hostname)
                }
            })
        })()
    }, [tabsProtect])

    return { hostname, isProtected }
}