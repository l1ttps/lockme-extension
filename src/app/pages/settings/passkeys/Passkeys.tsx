import CreatePasskeys from "./CreatePasskeys";
import ListPasskeys from "./ListPasskeys";

const Passkeys = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <CreatePasskeys />
            <ListPasskeys />
        </div>
    );
};

export default Passkeys;