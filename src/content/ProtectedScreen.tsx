import { useEffect, useMemo } from "react";
import { HiLockClosed } from "react-icons/hi";
import { useAppSelector } from "../app/redux/hooks";
import { TabsProtectState } from "../app/redux/slices/tabsProtect";
import { LockScreenType } from "../app/types/types";
import getRuntimeUrl from "../utils/getRuntimeUrl";

const ProtectedScreen = () => {
    const { isLocked } = useAppSelector(state => state.lock)
    const tabsProtect: TabsProtectState[] = useAppSelector(state => state.tabsProtect)
    const isProtected = useMemo(() => {
        const hostname = new URL(window.location.href).hostname
        return tabsProtect.some((tab) => tab.hostname === hostname)
    }, [tabsProtect])
    useEffect(() => {
        if (isLocked && isProtected) {
            const currentHref = encodeURIComponent(window.location.href)
            window.location.href = getRuntimeUrl(`lock-screen?type=${LockScreenType.TAB_PROTECTED}&redirect=${currentHref}`)
        }
    }, [isLocked, isProtected])
    return isLocked && isProtected ? (
        <div className="bg-white flex justify-center items-center fixed top-0 left-0 w-full h-screen">
            <div className="flex flex-col justify-center items-center">
                <HiLockClosed className="text-gray-500 text-5xl" />
                <span className="text-lg text-gray-500 font-bold">
                    Protected by Lock me
                </span>
            </div>
        </div>
    ) : <></>;
};

export default ProtectedScreen;