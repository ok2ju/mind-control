import { Ref } from 'react';
import Dialog from '../Dialog';
import RangeInput from '../RangeInput';

type Props = {
  innerRef: Ref<HTMLDialogElement> | null,
  onCancel: () => void,
};

const RecordDialog = ({ innerRef, onCancel }: Props) => {
  const handleCreateRecord = () => {};

  return (
    <Dialog ref={innerRef}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">How you feeling today?</h3>
        <div>
          <RangeInput name="mood" label="Mood" />
          <RangeInput name="energy" label="Energy level" />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-end">
        <button type="button" onClick={onCancel} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
        <button type="button" onClick={handleCreateRecord} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-700 text-base font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
      </div>
    </Dialog>
  );
};

export default RecordDialog;
