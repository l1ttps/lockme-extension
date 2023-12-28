import { ToggleSwitch } from 'flowbite-react';
import { useMemo } from "react";
import convertCamelCaseToHumanReadable from '../../helper/convertCamelCaseToHumanReadable';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SettingsState, changeSettings } from '../../redux/slices/settingsSlice';
const Configurations = () => {
    const dispatch = useAppDispatch()
    const settings = useAppSelector(state => state.settings)

    const mappingStateToggle = useMemo(() => {
        return [
            { key: "enableLock", },
            { key: "showPasswordHint", },
        ].map(({ key }) => ({
            key,
            state: settings[key],
            label: convertCamelCaseToHumanReadable(key)
        }));
    }, [settings]);
    const handleChangeState = (checked: boolean, key: keyof SettingsState) => {

        dispatch(changeSettings({
            checked,
            key
        }))
    }
    return (
        <>
            {
                mappingStateToggle.map((toggle) =>
                    <ToggleSwitch className='mb-5' key={toggle.key} name={toggle.label} checked={toggle.state} label={toggle.label} onChange={(checked) => handleChangeState(checked, toggle.key as any)} />)
            }
        </>
    );
};

export default Configurations;