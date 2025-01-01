import axios, { AxiosResponse } from 'axios';
import { Music, MusicDetail, MusicMovementDetail } from '@/types/music';

const instance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

export const musicApi = {
	getMusicByCategory: async (category: string): Promise<Music[]> => {
		try {
			const response: AxiosResponse<Music[]> = await instance.get(
				`api/v1/music/${category}`,
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error('음악 데이터 조회 실패');
		}
	},

	getDetailMusicByMusicId: async (music_id: string): Promise<MusicDetail> => {
		try {
			const response: AxiosResponse<MusicDetail> = await instance.get(
				`api/v1/music/step/${music_id}`,
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error('상세 음악 데이터 조회 실패');
		}
	},

	getDetailMusic: async (
		music_id: string,
		step: string,
		th: string,
	): Promise<MusicMovementDetail[]> => {
		try {
			const response: AxiosResponse<MusicMovementDetail[]> = await instance.get(
				`api/v1/music/detail/${music_id}/${step}/${th}`,
			);

			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error('상세 음악 데이터 조회 실패');
		}
	},
};
