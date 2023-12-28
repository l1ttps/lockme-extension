import { Tabs } from "flowbite-react";
import { HiAdjustments, HiLockClosed } from "react-icons/hi";
import Wrapper from "../../comps/Wrapper";
import ChangePassword from "./ChangePassword";
import Configurations from "./Configurations";

const Settings = () => {

    return (
        <Wrapper>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Settings
            </h1>
            <Tabs className="ring-0" aria-label="Default tabs" style="underline">
                <Tabs.Item className="focus:ring-0" active title="Configs" icon={HiAdjustments}>
                    <Configurations />
                </Tabs.Item>
                <Tabs.Item color="yellow" active title="Change password" icon={HiLockClosed}>
                    <ChangePassword />
                </Tabs.Item>
            </Tabs>
        </Wrapper>
    );
};

export default Settings;