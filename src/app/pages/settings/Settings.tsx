import { ToggleSwitch } from 'flowbite-react';
import { useMemo } from "react";
import Wrapper from "../../comps/Wrapper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removePassword } from "../../redux/slices/passwordSlice";
import { SettingsState, changeSettings } from '../../redux/slices/settingsSlice';

const Settings = () => {
    const dispatch = useAppDispatch()
    const settings = useAppSelector(state => state.settings)

    const mappingStateToggle = useMemo(() => {
        return [
            { key: "isEnableLock", label: "Enable Lock" },
            { key: "isShowPasswordHint", label: "Show Password Hint" }
        ].map(({ key, label }) => ({
            key,
            state: settings[key],
            label,
        }));
    }, [settings]);

    const handleChangeState = (checked: boolean, key: keyof SettingsState) => {
        console.log(checked, key);
        dispatch(changeSettings({
            checked,
            key
        }))
    }
    return (
        <Wrapper>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Settings
            </h1>
            {
                mappingStateToggle.map((toggle) =>
                    <ToggleSwitch key={toggle.key} name={toggle.label} checked={toggle.state} label={toggle.label} onChange={(checked) => handleChangeState(checked, toggle.key as any)} />)
            }
            <button onClick={() => dispatch(removePassword())}>remove password</button>
        </Wrapper>
    );
};

export default Settings;