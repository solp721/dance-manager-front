import React, { useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { musicApi } from '@/api/music';
import { useAtom } from 'jotai';
import { nameAtom } from '@/store';
import { Music } from '@/types/music';
import { musicDataAtom } from '@/store';
import { selectedMusicAtom } from '@/store';

const { width, height } = Dimensions.get('window');

export default function CategoryDetailScreen() {
	const params = useLocalSearchParams();
	const name = typeof params.name === 'string' ? params.name : params.name[0];
	const [musicData, setMusicData] = useAtom(musicDataAtom);
	const [nameData, setNameData] = useAtom(nameAtom);
	const [selectedMusic, setSelectedMusic] = useAtom(selectedMusicAtom);
	const router = useRouter();

	useEffect(() => {
		const fetchMusicData = async () => {
			try {
				const data = await musicApi.getMusicByCategory(name);
				setMusicData(data);

				switch (name) {
					case 'kpop':
						setNameData('케이팝');
						break;
					case 'shortform':
						setNameData('숏폼');
						break;
					case 'trot':
						setNameData('트로트');
						break;
					default:
						setNameData('창작 댄스');
				}
			} catch (error) {
				console.error('음악 데이터 불러오기 실패:', error);
			}
		};

		fetchMusicData();
	}, [name, setNameData, setMusicData, selectedMusic]);

	const renderItem = ({ item }: { item: Music }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					setSelectedMusic(item);
					router.push(`/music/${item.id}`);
				}}
				style={styles.background}
			>
				<View style={styles.listItem}>
					<View style={styles.background}>
						<Image source={{ uri: item.icon }} style={styles.musicIcon} />
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.titleName}>{item.name} - </Text>
						<Text style={styles.titleName}>{item.singer}</Text>
					</View>
					<TouchableOpacity>
						<Image
							source={require('@/assets/images/logo/player.png')}
							style={styles.playIcon}
						/>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<>
			{musicData ? (
				<View style={styles.container}>
					<View style={styles.mainContainer}>
						<View style={styles.titleWrapper}>
							<Text style={styles.mainTitleName}>인기있는 {nameData} 모음</Text>
							<Text style={styles.subTitleName}>전체 {musicData.length}</Text>
						</View>
					</View>
					<FlatList
						data={musicData}
						renderItem={renderItem}
						keyExtractor={item => item.id.toString()}
						style={styles.list}
					/>
				</View>
			) : (
				<View style={styles.container}>
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#0000ff" />
					</View>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: width * 0.05,
		backgroundColor: '#ffffff',
	},
	background: {
		backgroundColor: '#ffffff',
	},
	list: {
		flex: 1,
		paddingTop: height * 0.01,
		backgroundColor: '#ffffff',
	},
	listItem: {
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: 'rgb(229, 229, 229)',
		margin: height * 0.01,
		padding: height * 0.01,
		width: '90%',
		flex: 1,
		alignSelf: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 1,
		elevation: 1,
		backgroundColor: '#ffffff',
	},
	musicIcon: {
		width: width * 0.11,
		height: height * 0.051,
		backgroundColor: '#ffffff',
	},
	playIcon: {
		resizeMode: 'contain',
		width: width * 0.06,
		height: height * 0.028,
		backgroundColor: '#ffffff',
	},
	titleName: {
		fontFamily: 'NanumSquareRoundB',
		fontSize: height * 0.018,
		backgroundColor: '#ffffff',
	},
	mainTitleName: {
		fontFamily: 'NanumSquareRound',
		fontSize: height * 0.02,
		backgroundColor: '#ffffff',
	},
	subTitleName: {
		fontFamily: 'NanumSquareRound',
		paddingTop: height * 0.01,
		fontSize: height * 0.015,
		paddingBottom: height * 0.007,
		backgroundColor: '#ffffff',
	},
	mainContainer: {
		paddingTop: height * 0.03,
		paddingLeft: width * 0.06,
		backgroundColor: '#ffffff',
	},
	titleWrapper: {
		alignSelf: 'flex-start',
		borderBottomWidth: 5,
		borderColor: '#538BDD',
		backgroundColor: '#ffffff',
	},
	loadingContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
	},
});
