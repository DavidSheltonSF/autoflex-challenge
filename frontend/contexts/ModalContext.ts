import { Dispatch, SetStateAction } from 'react';

export type ModalContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
