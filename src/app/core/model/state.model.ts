import {Dispatch, SetStateAction} from 'react';

export type State<T> = [T, Dispatch<SetStateAction<T>>];
export type GlobalState<T extends object, K extends keyof T = any> = readonly[T[K], (u: SetStateAction<T[K]>) => void];

