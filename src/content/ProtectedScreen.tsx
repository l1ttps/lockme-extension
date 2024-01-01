import { useEffect } from "react";
import { useAppSelector } from "../app/redux/hooks";
import { LockScreenType } from "../app/types/types";
import getRuntimeUrl from "../utils/getRuntimeUrl";

const ProtectedScreen = () => {
    const { isLocked } = useAppSelector(state => state.lock)

    useEffect(() => {
        if (isLocked) {
            const currentHref = encodeURIComponent(window.location.href)
            window.location.href = getRuntimeUrl(`lock-screen?type=${LockScreenType.TAB_PROTECTED}&redirect=${currentHref}`)
        }
    }, [isLocked])
    return (
        <div></div>
    );
};

export default ProtectedScreen;