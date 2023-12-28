import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const CreatePasskeys = () => {
    return (
        <div>
            <ButtonCreatePasskeys />
        </div>
    );
};


const ButtonCreatePasskeys = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Create</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Create passkeys</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => setOpenModal(false)}>Save</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}
export default CreatePasskeys;