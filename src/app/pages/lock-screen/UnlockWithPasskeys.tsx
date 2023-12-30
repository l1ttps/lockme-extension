import { Button, Spinner } from "flowbite-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import unlockWithPasskeys from "../../../utils/unlockWithPasskeys";
import { useAppSelector } from "../../redux/hooks";

interface UnlockWithPasskeysProps {
    callback: () => void
}
const UnlockWithPasskeys = (props: UnlockWithPasskeysProps) => {
    const { callback } = props
    const objPasskeys = useAppSelector(state => state.passkeys)
    const [loading, setLoading] = useState(false)

    const passkeys = Object.keys(objPasskeys)
    const handleUnLockWithPasskeys = useCallback(async () => {
        setLoading(true)
        unlockWithPasskeys(passkeys[0]).finally(() => {
            done()
        }).then((verifyStatus) => {
            if (verifyStatus) {
                callback()
            }
            else {
                toast("Passkey verification failed", { type: "success", })
            }
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