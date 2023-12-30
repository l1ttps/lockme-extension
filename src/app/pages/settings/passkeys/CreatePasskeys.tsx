import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import createPasskeys from "../../../../utils/createPasskey";
import { useAppDispatch } from "../../../redux/hooks";
import { saveVerification } from "../../../redux/slices/passkeysSlice";

/**
 * Generates a passkey creation component.
 *
 * @return {JSX.Element} The passkey creation component.
 */
const CreatePasskeys = () => {
    return (
        <div className="flex justify-end w-full">
            <ButtonCreatePasskeys />
        </div>
    );
};

/**
 * Renders a button component to create passkeys.
 *
 * @return {JSX.Element} The rendered button component.
 */
const ButtonCreatePasskeys = () => {
    const dispatch = useAppDispatch()
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data: { username: any; }) => {
        const { username } = data
        setLoading(true)
        createPasskeys(username)
            .then((verification) => {

                dispatch(saveVerification({
                    username,
                    verification: verification as any
                }))
            })
            .finally(() => done())
            .catch((e) => {
                console.error(e);
                toast("Create passkeys cannot be done", { type: "error", })
            })
    };
    const done = () => {
        setOpenModal(false)
        reset()
        setLoading(false)
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Create</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit as any)}>
                    <Modal.Header>Create passkeys</Modal.Header>
                    <Modal.Body>
                        <div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <TextInput autoFocus {...register("username", { required: true })} type="text" name="username" id="username" />
                            </div>
                            {errors.username && <span className='text-red-500'>{errors.username.message?.toString()}</span>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Cancel
                        </Button>
                        <Button disabled={loading} type="submit">Save</Button>
                        {loading && <Spinner color="info" aria-label="Info spinner example" />}
                    </Modal.Footer>
                </form >
            </Modal>
        </>
    );
}
export default CreatePasskeys;