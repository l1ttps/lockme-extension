import { ReactElement } from 'react';
const Popup = (): ReactElement => {
  document.body.style.width = '15rem';
  document.body.style.height = '15rem';
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className='text-red-500'>Popup 1</h1>
    </div>
  );
};

export default Popup;
