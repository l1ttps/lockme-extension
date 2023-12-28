import { Tabs } from "flowbite-react";
import { useMemo } from "react";
import { HiAdjustments, HiKey, HiLockClosed } from "react-icons/hi";
import Wrapper from "../../comps/Wrapper";
import ChangePassword from "./ChangePassword";
import Configurations from "./Configurations";
import Passkeys from "./passkeys/Passkeys";

const Settings = () => {
    const tabs = useMemo(() => {
        return [
            {
                title: "Passkeys",
                icon: HiKey,
                component: <Passkeys />
            },
            {
                title: "Configs",
                icon: HiAdjustments,
                component: <Configurations />
            },

            {
                title: "Change password",
                icon: HiLockClosed,
                component: <ChangePassword />
            }
        ]
    }, [])
    return (
        <Wrapper>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Settings
            </h1>
            <Tabs aria-label="Default tabs" style="underline">
                {tabs.map((tab => <Tabs.Item key={tab.title} title={tab.title} icon={tab.icon}>
                    {tab.component}
                </Tabs.Item>))}
            </Tabs>
        </Wrapper>
    );
};

export default Settings;