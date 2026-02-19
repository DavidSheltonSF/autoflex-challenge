import { ReactNode, useEffect, useRef } from 'react';
import { CloseIcon } from '../icons/CloseIcon';
import { LoadingIcon } from '../icons/LoadingIcon';

interface Props {
  close: Function;
  children: ReactNode;
  additionalStyles: string;
  isLoading?: boolean;
}

export function BaseModal({ close, children, additionalStyles, isLoading }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOut(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleCloseModal();
      }
    }

    document.addEventListener('click', handleClickOut);

    return () => {
      document.removeEventListener('click', handleClickOut);
    };
  }, []);

  function handleCloseModal() {
    modalRef.current?.classList.add('fade-out-animation');
    setTimeout(() => {
      close();
    }, 300);
  }

  return (
    <div
      ref={modalRef}
      className={`flex flex-col fixed top-[10%] left-[50%] translate-x-[-50%] bg-color-white shadow-[0_0_3px_black] rounded-lg fade-in-animation ${additionalStyles} min-h-[20vh]`}
    >
      <div className="flex justify-end items-center p-[8px] border-b bg-color-primary">
        <button
          className="rounded-sm hover:bg-[var(--color-white)]/30 transition-[background] duration-300 cursor-pointer"
          onClick={handleCloseModal}
        >
          <CloseIcon width="32px" height="32px" color="var(--color-white)" />
        </button>
      </div>
      {isLoading ? (
        <span className="m-auto animate-spin">
          {' '}
          <LoadingIcon height="56px" width="56px" />
        </span>
      ) : (
        <div className="flex size-full p-[16px] fade-in-animation">{children}</div>
      )}
    </div>
  );
}
