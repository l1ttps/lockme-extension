import { Button } from "flowbite-react";
import { useAppSelector } from "../app/redux/hooks";

const Unlock = () => {
    const state = useAppSelector(state => state)
    console.log(state);
    return (
        <Button>a</Button>
    );
};

export default Unlock;