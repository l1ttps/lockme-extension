import * as bcrypt from "bcryptjs";
import { ReactElement } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Wrapper from "../../comps/Wrapper";
import { setPassword } from "../../redux/slices/passwordSlice";
import { PasswordForm } from "../../type/types";

const Welcome = (): ReactElement => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const onSubmit = async (data: PasswordForm | any) => {
    const hash = bcrypt.hashSync(data.password)
    dispatch(setPassword(hash))
    navigate("/settings");
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
    <Wrapper>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create new password
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input {...register("password", { ...validateFormPassWord })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {errors.password && <span className='text-red-500'>{errors.password.message?.toString()}</span>}
        <div>
          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <input {...register("confirmPassword", { ...validateFormPassWord, validate: (value) => value === watch("password") || "Passwords must match", })} type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message?.toString()}</span>}
        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Lock now</button>
      </form>
    </Wrapper>
  );
};

export default Welcome;