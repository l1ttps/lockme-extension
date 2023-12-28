import * as bcrypt from "bcryptjs";
import { Button, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PasswordForm } from "../../../types/types";
import { useAppSelector } from "../../redux/hooks";
import { setPassword } from "../../redux/slices/passwordSlice";

const ChangePassword = () => {
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const { hash } = useAppSelector(state => state.password)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onSubmit = async (data: PasswordForm | any) => {
        const { oldPassword, password, passwordHint: hint } = data
        if (bcrypt.compareSync(oldPassword, hash)) {
            dispatch(setPassword({
                hash: bcrypt.hashSync(password),
                hint
            }))
            toast("Password updated successfully", { type: "success", })
            navigate("/settings");
        }
        else {
            setError("oldPassword", { type: "manual", message: "Old password is not correct" })
        }
    };

    const validateFormPassWord = {
        required: {
            value: true,
            message: 'Password is required',
        },
        minLength: {
            value: 6,
            message: 'Passwords min length is 6 characters',
        },
        maxLength: {
            value: 30,
            message: 'Passwords max length is 30 characters',
        }
    }
    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="old-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                <TextInput color="blue" id="old-password" type="password" placeholder="••••••••" {...register("oldPassword", {
                    required: true,
                    // validate: (password) => bcrypt.compareSync(password, hash) || "Old password is not correct"
                })} />
            </div>
            {errors.oldPassword && <span className='text-red-500'>{errors.oldPassword.message?.toString()}</span>}
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <TextInput color="blue" {...register("password", { ...validateFormPassWord })} type="password" name="password" id="password" placeholder="••••••••" />
            </div>
            {errors.password && <span className='text-red-500'>{errors.password.message?.toString()}</span>}
            <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <TextInput color="blue" {...register("confirmPassword", { ...validateFormPassWord, validate: (value) => value === watch("password") || "Passwords must match" })} type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" />
            </div>
            {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message?.toString()}</span>}
            <div>
                <label htmlFor="password-hint" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Hint</label>
                <TextInput color="blue" {...register("passwordHint", { required: true })} type="text" name="passwordHint" id="password-hint" placeholder="•" />
            </div>
            {errors.passwordHint && <span className='text-red-500'>{errors.passwordHint.message?.toString()}</span>}
            <Button color="blue" type="submit" fullSized>Change password</Button>
        </form>
    );
};

export default ChangePassword;