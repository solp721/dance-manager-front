import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { musicApi } from '@/api/music';
import { MusicDetail } from '@/types/music';
import { selectedMusicAtom } from '@/store';
import { useAtom } from 'jotai';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

export default function MusicDetailScreen() {
	const { musicId } = useLocalSearchParams();
	const [selectedMusic] = useAtom(selectedMusicAtom);
	const [musicDetail, setMusicDetail] = useState<MusicDetail[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchMusicDetail = async () => {
			try {
				const data = await musicApi.getDetailMusicByMusicId(musicId as string);
				setMusicDetail(Array.isArray(data) ? data : [data]);
			} catch (error) {
				console.error('음악 상세 데이터 불러오기 실패:', error);
			}
		};

		fetchMusicDetail();
	}, [musicId, selectedMusic]);

	return (
		<View style={styles.container}>
			{selectedMusic ? (
				<View style={styles.listItem}>
					<View>
						<Image
							source={{ uri: selectedMusic.icon }}
							style={styles.musicIcon}
						/>
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.titleName}>{selectedMusic.name} - </Text>
						<Text style={styles.titleName}>{selectedMusic.singer}</Text>
					</View>
				</View>
			) : (
				<Text>음악 정보를 불러오는 중입니다...</Text>
			)}
			{musicDetail.length > 0 && (
				<ScrollView style={styles.scrollCotnainer}>
					{[0, 1, 2].map(step => {
						const stepData = musicDetail.filter(
							musicItem => musicItem.step === step,
						);
						return (
							<View key={step} style={styles.carouselContainer}>
								<View style={styles.stepTitleContainer}>
									<Text style={styles.stepTitle}>
										{step} 단계 :
										{step === 0
											? ' 기본 동작'
											: step === 1
												? ' 전체 춤 확인 동작'
												: ' 1단계의 각 파트를 합친 동작'}
									</Text>
								</View>
								<Swiper
									style={styles.wrapper}
									showsButtons={true}
									showsPagination={true}
								>
									{stepData.map((item, index) => (
										<TouchableOpacity
											key={index}
											style={styles.carousel}
											onPress={() =>
												router.push(
													`/music/detail/${musicId}_${item.step}_${item.th}`,
												)
											}
										>
											<View style={styles.textContainer}>
												<Text style={styles.stepText}>
													PART{item.th}. {item.move_name}
												</Text>
											</View>
										</TouchableOpacity>
									))}
								</Swiper>
							</View>
						);
					})}
					<View style={styles.carouselContainer}>
						<View style={styles.stepTitleContainer}>
							<Text style={styles.stepTitle}>3 단계 : 추가 정보</Text>
						</View>
						{musicDetail
							.filter(musicItem => musicItem.step === 3)
							.map(item => (
								<TouchableOpacity
									key={item.id}
									style={styles.fullOperation}
									onPress={() =>
										router.push(
											`/music/detail/${musicId}_${item.step}_${item.th}`,
										)
									}
								>
									<View style={styles.textContainer}>
										<Text style={styles.stepText}>{item.move_name}</Text>
									</View>
								</TouchableOpacity>
							))}
					</View>
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#538BDE',
	},
	listItem: {
		backgroundColor: '#EBEBEE',
		position: 'absolute',
		top: height * 0.07,
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: 'rgb(229, 229, 229)',
		margin: height * 0.01,
		padding: height * 0.01,
		alignSelf: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 1,
		elevation: 1,
	},
	musicIcon: {
		width: width * 0.11,
		height: height * 0.051,
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: width * 0.05,
	},
	titleName: {
		fontFamily: 'NanumSquareRound',
		fontSize: height * 0.018,
	},
	scrollCotnainer: {
		marginTop: height * 0.15,
	},
	stepTitleContainer: {
		width: width * 0.9,
		paddingTop: height * 0.025,
	},
	stepTitle: {
		fontFamily: 'NanumSquareRound',
		fontSize: height * 0.022,
		paddingBottom: height * 0.01,
	},
	carouselContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.95,
	},
	carousel: {
		borderWidth: 1,
		borderColor: 'rgb(229, 229, 229)',
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 24,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 1,
		elevation: 1,
		margin: 5,
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	stepText: {
		fontFamily: 'NanumSquareRound',
		fontSize: height * 0.03,
	},
	fullOperation: {
		backgroundColor: 'white',
		width: '90%',
		height: height * 0.08,
		borderRadius: 24,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 1,
		elevation: 1,
		borderWidth: 1,
		borderColor: 'rgb(229, 229, 229)',
		flex: 1,
	},
	wrapper: {
		height: height * 0.15,
	},
});
