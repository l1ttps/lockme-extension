import { Button, Table, TextInput } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteVerification, updateDeviceName } from "../../../redux/slices/passkeysSlice";

/**
 * Renders a list of passkeys.
 *
 * @return {JSX.Element} The JSX element representing the list of passkeys.
 */
const ListPasskeys = () => {
    const dispatch = useAppDispatch()
    const objPasskeys = useAppSelector(state => state.passkeys)
    const passkeys = Object.keys(objPasskeys)

    const handleDeleteVerification = (username: string) => {
        dispatch(deleteVerification(username))
    }

    if (passkeys.length === 0) return <div className="w-full text-lg text-center text-gray-500">No passkeys found</div>

    const handleChangeDeviceName = (username: string, e: React.ChangeEvent) => {
        const target = e.target as HTMLButtonElement;;
        dispatch(updateDeviceName({
            deviceName: target.value,
            username
        }))
    }
    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Device</Table.HeadCell>
                    <Table.HeadCell>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {passkeys.map(passkey => {
                        return (
                            <Table.Row key={passkey} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {passkey}
                                </Table.Cell>
                                <Table.Cell>
                                    <TextInput maxLength={20} placeholder="Unnamed Device" value={objPasskeys[passkey].deviceName} onChange={(e) => handleChangeDeviceName(passkey, e)} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => handleDeleteVerification(passkey)} color="failure" pill size="xs">Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

export default ListPasskeys;