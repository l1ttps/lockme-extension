import { Button, Table } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteVerification } from "../../../redux/slices/passkeysSlice";

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
                                <Table.Cell></Table.Cell>
                                <Table.Cell className="flex justify-end">
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