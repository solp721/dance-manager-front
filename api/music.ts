import axios, { AxiosResponse } from 'axios';

interface Music {
	id: number;
	name: string;
	category: string;
	singer: string;
}

const instance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

export const musicApi = {
	getMusicByCategory: async (category: string): Promise<Music[]> => {
		try {
			const response: AxiosResponse<Music[]> = await instance.get(
				`/music/${category}`,
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error('음악 데이터 조회 실패');
		}
	},
};
