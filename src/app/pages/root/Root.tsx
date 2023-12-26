import { useMemo } from "react";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { lock } from "../../redux/slices/lockSlice";

const Root = () => {
    const dispatch = useAppDispatch()
    const password = useAppSelector(state => state.password.hash)
    const isLocked = useAppSelector(state => state.lock.isLocked)
    // const redirect = password ? "/settings" : "/welcome";
    const redirect = useMemo(() => {
        if (!password) return "welcome"
        else if (password && isLocked) return "lock-screen"
        else return "settings"
    }, [isLocked, password])

    if (password && !isLocked) {
        dispatch(lock())
    }
    return (
        <Navigate to={redirect} replace={true} />
    );
};

export default Root;