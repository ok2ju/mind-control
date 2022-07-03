import { useRef } from 'react';
import NavLink from './NavLink';
import Logo from '../../components/Icons/Logo';
import RecordDialog from '../RecordDialog';
import { NavLinkTypes } from '../../types/nav';

const Header = () => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  const openCreateRecordDialog = () => {
    if (dialog.current) {
      dialog.current.showModal();
    }
  };

  const closeCreateRecordDialog = () => {
    if (dialog.current) {
      dialog.current.close();
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <Logo className="fill-white w-8" />
              <h1 className="text-white ml-3 cursor-default">MindTracker</h1>
            </div>
            <div className="sm:ml-6 ">
              <div className="flex">
                <NavLink href="/home">Home</NavLink>
                <NavLink type={NavLinkTypes.Button} onClick={openCreateRecordDialog}>Create</NavLink>
                <NavLink href="/stats">Analyze</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecordDialog innerRef={dialog} onCancel={closeCreateRecordDialog} />
    </nav>
  );
};

export default Header;
