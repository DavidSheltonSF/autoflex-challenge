import { createContext } from 'react';
import { ModalContext } from '../ModalContext';

export const AddCommodityModalContext = createContext<ModalContext | null>(null);
