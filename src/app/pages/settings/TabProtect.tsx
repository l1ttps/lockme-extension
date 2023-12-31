import * as dayjs from "dayjs";
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { Button, Table, Tooltip } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TabsProtectState, deleteTab } from "../../redux/slices/tabsProtect";
dayjs.extend(relativeTime)
const TabProtect = () => {
    const dispatch = useAppDispatch()
    const tabsProtect: TabsProtectState[] = useAppSelector(state => state.tabsProtect)
    if (tabsProtect.length === 0) return <div className="w-full text-lg text-center text-gray-500">No tabs added</div>

    const handleDeleteTab = (hostname: string) => {
        dispatch(deleteTab(hostname))
    }
    return (

        <Table>
            <Table.Head>
                <Table.HeadCell>Tab</Table.HeadCell>
                <Table.HeadCell>Create at</Table.HeadCell>
                <Table.HeadCell>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {tabsProtect.map(tab => {
                    return (
                        <Table.Row key={tab.hostname} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {tab.hostname}
                            </Table.Cell>
                            <Table.Cell>
                                <Tooltip content={dayjs(tab.createdAt).format("HH:mm DD/MM/YYYY")}>
                                    {(dayjs(tab.createdAt) as any).fromNow()}
                                </Tooltip>

                            </Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => handleDeleteTab(tab.hostname)} color="failure" pill size="xs">Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    );
};

export default TabProtect;