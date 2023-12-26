import * as bcrypt from "bcryptjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Wrapper from "../../comps/Wrapper";
import { useAppSelector } from "../../redux/hooks";
import { retry, unLock } from "../../redux/slices/lockSlice";
import { LockScreenForm } from "../../type/types";

const LockScreen = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const { hash } = useAppSelector(state => state.password)
    const [update, setUpdate] = useState(new Date().getTime())
    const { disabledExpires } = useAppSelector(state => state.lock)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onSubmit = async (data: LockScreenForm | any) => {
        const { password } = data
        const passed = bcrypt.compareSync(password, hash)
        if (passed) {
            // handle success
            dispatch(unLock())
            navigate("/settings");
        }
        else {
            // show error
            setError('password', { type: 'manual', message: 'Password incorrect' })
            // increase tried
            dispatch(retry())
        }
    };

    // const unlockAble = useMemo(() => {
    //     return disabledExpires < new Date().getTime()
    // }, [disabledExpires])


    return (
        <Wrapper>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input {...register("password", { required: true })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {errors.password && <span className='text-red-500'>{errors.password.message?.toString()}</span>}
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Unlock</button>

            </form>
        </Wrapper>
    );
};

export default LockScreen;