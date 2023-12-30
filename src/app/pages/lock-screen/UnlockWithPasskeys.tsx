import { Button, Spinner } from "flowbite-react";
import { useCallback, useState } from "react";
import unlockWithPasskeys from "../../../utils/unlockWithPasskeys";
import { useAppSelector } from "../../redux/hooks";

const UnlockWithPasskeys = () => {
    const objPasskeys = useAppSelector(state => state.passkeys)
    const [loading, setLoading] = useState(false)

    const passkeys = Object.keys(objPasskeys)
    const handleUnLockWithPasskeys = useCallback(async () => {
        setLoading(true)
        unlockWithPasskeys(passkeys[0]).finally(() => {
            done()
        })
    }, [])

    const done = useCallback(() => {
        setLoading(false)
    }, [])

    if (passkeys.length === 0) return <></>
    return (
        <div>
            <Button disabled={loading} onClick={handleUnLockWithPasskeys} fullSized color="gray">
                {loading ? <div className="flex items-center gap-x-3">
                    <Spinner size={"sm"} color="info" aria-label="Info spinner example" />
                    <span>Authenticating</span>
                </div> :
                    <span>Use passkeys</span>
                }
            </Button>
        </div>
    );
};

export default UnlockWithPasskeys;