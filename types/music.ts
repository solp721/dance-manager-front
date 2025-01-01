export interface Music {
	id: number;
	name: string;
	category: string;
	singer: string;
	icon: string;
}

export interface MusicDetail {
	id: number;
	link: string;
	music_id: number;
	move_name: string;
	step: number;
	th: number;
	music_list: {
		name: string;
	};
}

export interface MusicMovementDetail {
	id: number;
	link: string;
	created_at: string;
	step: number;
	th: number;
	music_id: number;
	move_name: string;
}
