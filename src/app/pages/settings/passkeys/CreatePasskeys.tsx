import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import createPasskeys from "../../../../utils/createPasskey";

const CreatePasskeys = () => {
    return (
        <div>
            <ButtonCreatePasskeys />
        </div>
    );
};

interface ICreatePasskeysForm {
    username: string
}

const ButtonCreatePasskeys = () => {
    const [openModal, setOpenModal] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data: { username: any; }) => {
        const { username } = data
        createPasskeys(username).finally(() => done()).catch((e) => {
            console.log(e);
            toast("Create passkeys cannot be done", { type: "error", })
        })
    };

    const done = () => {
        setOpenModal(false)
        reset()
    }
    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Create</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit as any)}>
                    <Modal.Header>Create passkeys</Modal.Header>
                    <Modal.Body>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <TextInput autoFocus {...register("username", { required: true })} type="text" name="username" id="username" />
                        </div>
                        {errors.username && <span className='text-red-500'>{errors.username.message?.toString()}</span>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </Modal.Footer>
                </form >
            </Modal>
        </>
    );
}
export default CreatePasskeys;