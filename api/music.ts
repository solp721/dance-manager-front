import axios, { AxiosResponse } from 'axios';
import { Music, MusicDetail, MusicMovementDetail } from '@/types/music';
import Constants from 'expo-constants';

// # APK 빌드
// eas build -p android --profile preview

// # AAB 빌드
// eas build -p android --profile production

// # keystore
// eas credentials

// const API_BASE_URL = (() => {
// 	const expoConfigUrl = Constants.manifest?.extra?.EXPO_PUBLIC_API_BASE_URL;
// 	const envConfigUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

// 	if (expoConfigUrl) {
// 		return expoConfigUrl;
// 	}

// 	if (envConfigUrl) {
// 		return envConfigUrl;
// 	}

// 	return 'https://fallback.api.com';
// })();

const abc = Constants.manifest?.extra?.EXPO_PUBLIC_API_BASE_URL;
console.log(abc);
// const def = process.env.EXPO_PUBLIC_API_BASE_URL;

const instance = axios.create({
	baseURL: Constants.manifest?.extra?.EXPO_PUBLIC_API_BASE_URL,
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
