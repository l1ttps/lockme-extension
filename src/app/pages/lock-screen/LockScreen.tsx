import * as bcrypt from "bcryptjs";
import { Button, TextInput } from "flowbite-react";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from 'react-router-dom';
import browser from "webextension-polyfill";
import Wrapper from "../../comps/Wrapper";
import { useAppSelector } from "../../redux/hooks";
import { retry, unLock } from "../../redux/slices/lockSlice";
import { LockScreenForm, LockScreenType } from "../../types/types";
import UnlockWithPasskeys from "./UnlockWithPasskeys";

const LockScreen = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const redirect = searchParams.get('redirect') || '';
    const { hash, hint } = useAppSelector(state => state.password)
    const { showPasswordHint } = useAppSelector(state => state.settings)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const isWindow = useMemo(() => {
        return type === LockScreenType.WINDOW
    }, [type])
    const onSubmit = async (data: LockScreenForm | any) => {
        const { password } = data
        const passed = bcrypt.compareSync(password, hash)
        if (passed) { // Handle passed lock screen
            handleUnlock()
        }
        else {
            setError('password', { type: 'manual', message: 'Password incorrect' })
            dispatch(retry())
        }
    };

    const handleUnlock = useCallback(() => {
        try {
            dispatch(unLock())
            if (isWindow) {
                handleCloseWindow()
            }
            else if (redirect) {
                window.location.href = redirect
            }
            else {
                navigate("/settings")
            }
        }
        catch {
            navigate("/settings")
        }
    }, [])

    useEffect(() => {
        // Add event listener to the whole document
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleCloseWindow = () => {
        browser.windows.getCurrent().then(tab => {
            if (tab.id) browser.windows.remove(tab.id)
        })
    }


    const handleKeyDown = (event: any) => {

        if (event.key.startsWith('F')) { // Check for F1 to F12
            event.preventDefault();
        }
    };

    const showRedirectHostname = useMemo(() => {

        try {
            const hostname = new URL(decodeURI(redirect))?.hostname
            document.title = hostname
            return new URL(decodeURI(redirect))?.hostname
        }
        catch {
            return null
        }
    }, [redirect])
    return (
        <div tabIndex={0} onKeyDown={handleKeyDown}>
            <Wrapper>
                {type === LockScreenType.TAB_PROTECTED && <div className="text-center">
                    <title>{showRedirectHostname}</title>
                    <span className="text-lg">{showRedirectHostname}</span>
                </div>
                }
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <TextInput autoFocus {...register("password", { required: true })} type="password" name="password" id="password" placeholder="••••••••" />
                    </div>
                    {errors.password && <span className='text-red-500'>{errors.password.message?.toString()}</span>}
                    {showPasswordHint && <div className='text-center text-gray-400'>Password Hint: {hint}</div>}
                    <Button fullSized type="submit">Unlock</Button>
                    <UnlockWithPasskeys callback={handleUnlock} />
                    {isWindow && <div className="flex justify-center w-full">
                        <Button onClick={handleCloseWindow} color="gray" pill>
                            Close
                        </Button></div>}
                </form>
            </Wrapper>

        </div>
    );
};

export default LockScreen;