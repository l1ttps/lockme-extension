import Wrapper from "../../comps/Wrapper";
import { useAppDispatch } from "../../redux/hooks";
import { removePassword } from "../../redux/slices/passwordSlice";
const Settings = () => {
    const dispatch = useAppDispatch()
    return (
        <Wrapper>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Settings
            </h1>

            {/* <ToggleSwitch checked={true} label="Toggle me" onChange={() => { }} /> */}
            <button onClick={() => dispatch(removePassword())}>remove password</button>
        </Wrapper>
    );
};

export default Settings;