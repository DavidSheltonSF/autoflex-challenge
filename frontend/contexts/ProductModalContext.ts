import { createContext } from 'react';
import { ModalContext } from './ModalContext';

export const ProductModalContext = createContext<ModalContext | null>(null);
