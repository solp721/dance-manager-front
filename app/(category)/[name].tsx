import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { musicApi } from '@/api/music';

interface Music {
	id: number;
	name: string;
	category: string;
	singer: string;
}

export default function CategoryDetailScreen() {
	const params = useLocalSearchParams();
	const name = typeof params.name === 'string' ? params.name : params.name[0];
	const [musicData, setMusicData] = useState<Music[]>([]);

	useEffect(() => {
		const fetchMusicData = async () => {
			try {
				const data = await musicApi.getMusicByCategory(name);
				setMusicData(data);
			} catch (error) {
				console.error('음악 데이터 불러오기 실패:', error);
			}
		};

		fetchMusicData();
	}, [name]);

	const renderItem = ({ item }: { item: Music }) => (
		<View style={styles.musicItem}>
			<Text style={styles.musicName}>{item.name}</Text>
			<Text style={styles.singerName}>{item.singer}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={musicData}
				renderItem={renderItem}
				keyExtractor={item => item.id.toString()}
				style={styles.list}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	list: {
		flex: 1,
	},
	musicItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	musicName: {
		fontSize: 18,
		fontWeight: '600',
	},
	singerName: {
		fontSize: 14,
		color: '#666',
		marginTop: 4,
	},
});
