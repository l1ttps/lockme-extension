import * as bcrypt from "bcryptjs";
import { Button } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from 'react-router-dom';
import browser from "webextension-polyfill";
import { LockScreenForm, LockScreenType } from "../../../types/types";
import Wrapper from "../../comps/Wrapper";
import { useAppSelector } from "../../redux/hooks";
import { retry, unLock } from "../../redux/slices/lockSlice";

const LockScreen = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const { hash, hint } = useAppSelector(state => state.password)
    const { isShowPasswordHint } = useAppSelector(state => state.settings)
    const [update, setUpdate] = useState(new Date().getTime())
    const { disabledExpires } = useAppSelector(state => state.lock)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const isWindow = useMemo(() => {
        return type === LockScreenType.WINDOW
    }, [type])
    const onSubmit = async (data: LockScreenForm | any) => {
        const { password } = data
        const passed = bcrypt.compareSync(password, hash)
        if (passed) { // Handle passed lock screen
            dispatch(unLock())
            // Close window
            if (isWindow) {
                handleCloseWindow()
            }
            else navigate("/settings");
        }
        else {
            setError('password', { type: 'manual', message: 'Password incorrect' })
            dispatch(retry())
        }
    };

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
    return (
        <div tabIndex={0} onKeyDown={handleKeyDown}>
            <Wrapper>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input autoFocus {...register("password", { required: true })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {errors.password && <span className='text-red-500'>{errors.password.message?.toString()}</span>}
                    {isShowPasswordHint && <div className='text-center text-gray-400'>Password Hint: {hint}</div>}
                    <Button color="blue" fullSized type="submit">Unlock</Button>
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