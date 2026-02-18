import { createContext } from 'react';
import { ModalContext } from '../ModalContext';

export const DeleteCommodityModalContext = createContext<ModalContext | null>(null);
