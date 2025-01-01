import { atom } from 'jotai';
import { Music } from '@/types/music';

export const selectedMusicAtom = atom<Music | null>(null); // 초기값은 null
