import { atom } from 'jotai';
import { Music } from '@/types/music';

export const musicDataAtom = atom<Music[]>([]);
