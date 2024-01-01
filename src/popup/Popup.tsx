import { Badge, Button } from 'flowbite-react';
import { ReactElement } from 'react';
import useProtected from '../app/hooks/useProtected';
import { useAppDispatch } from '../app/redux/hooks';
import { lock } from '../app/redux/slices/lockSlice';
import { addNewTab } from '../app/redux/slices/tabsProtect';
const Popup = (): ReactElement => {
  document.body.style.width = '25rem';
  document.body.style.height = '25rem';

  const dispatch = useAppDispatch()
  const { isProtected, hostname } = useProtected()
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
        {isProtected ? <Button fullSized onClick={() => dispatch(lock())}>Lock now</Button> : <Button fullSized onClick={handleAddNewTabProtect}>Add</Button>}
      </div>
    </div>
  );
};

export default Popup;
