import { Badge, Button } from 'flowbite-react';
import { ReactElement, useEffect, useState } from 'react';
import Browser from 'webextension-polyfill';
import { useAppDispatch, useAppSelector } from '../app/redux/hooks';
import { TabsProtectState, addNewTab } from '../app/redux/slices/tabsProtect';
const Popup = (): ReactElement => {
  document.body.style.width = '25rem';
  document.body.style.height = '25rem';
  const tabsProtect: TabsProtectState[] = useAppSelector(state => state.tabsProtect)
  const dispatch = useAppDispatch()
  const [isProtected, setIsProtected] = useState(false)
  const [hostname, setHostname] = useState<string>("")

  useEffect(() => {
    (async () => {
      Browser.tabs.query({ active: true }).then(tabs => {
        const currentTab = tabs[0]
        if (currentTab.url) {
          const hostname = new URL(currentTab.url).hostname
          setIsProtected(tabsProtect.some((tab) => tab.hostname === hostname))
          setHostname(hostname)
        }
      })
    })()
  }, [tabsProtect])

  /**
   * Handles adding a new protected tab.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  const handleAddNewTabProtect = () => {
    dispatch(
      addNewTab({
        hostname
      })
    )
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen p-3">
      <div className='w-2/3 text-center'>
        <p className='text-xl font-bold truncate'>{hostname}</p>
      </div>
      {!isProtected ? <Badge color="warning">Unprotected</Badge> : <Badge color="success">Protected</Badge>}
      <div className='fixed bottom-0 w-full p-3'>
        {!isProtected && <Button fullSized onClick={handleAddNewTabProtect}>Add</Button>}
      </div>
    </div>
  );
};

export default Popup;
