import { Button } from "flowbite-react";
import { useCallback } from "react";
import unlockWithPasskeys from "../../../utils/unlockWithPasskeys";
import { useAppSelector } from "../../redux/hooks";

const UnlockWithPasskeys = () => {
    const objPasskeys = useAppSelector(state => state.passkeys)
    const passkeys = Object.keys(objPasskeys)
    const handleUnLockWithPasskeys = useCallback(async () => {
        unlockWithPasskeys(passkeys[0])
    }, [])
    if (passkeys.length === 0) return <></>
    return (
        <div>
            <Button onClick={handleUnLockWithPasskeys} fullSized color="gray">Use passkeys</Button>
        </div>
    );
};

export default UnlockWithPasskeys;