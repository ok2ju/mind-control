import { forwardRef, ReactNode } from 'react';

type Props = {
  children: ReactNode,
};

const Dialog = forwardRef<HTMLDialogElement, Props>(({ children }, ref) => {
  return (
    <dialog ref={ref} className="dialog rounded-lg shadow-xl bg-white overflow-hidden p-0">
      {children}
    </dialog>
  );
});

export default Dialog;
