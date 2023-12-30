import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { TabsProtectState } from "../redux/slices/tabsProtect";

export interface TabProtectedHook {
    isProtected: boolean,
    hostname?: string
}

export default function useTabsProtect(): TabProtectedHook {
    const [state, setState] = useState<TabProtectedHook>({
        isProtected: false
    })
    const tabsProtect: TabsProtectState[] = useAppSelector(state => state.tabsProtect)

    return state
}