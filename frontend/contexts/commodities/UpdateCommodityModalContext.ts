import { createContext } from 'react';
import { ModalContext } from '../ModalContext';

export const UpdateCommodityModalContext = createContext<ModalContext | null>(null);
