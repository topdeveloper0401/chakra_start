import { atom } from 'recoil';

export const hostname = atom<string>({
    key: 'hostname',
    default: '',
});

export const isLoadingState = atom<boolean>({
    key: 'isLoading',
    default: false,
});
