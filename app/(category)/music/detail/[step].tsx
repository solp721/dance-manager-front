import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
	ImageBackground,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { musicApi } from '@/api/music';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function MusicDetailPage() {
	const { step } = useLocalSearchParams();
	const router = useRouter();
	const [musicDetail, setMusicDetail] = useState<any>(null);
	const videoRef = useRef<Video>(null);
	const [isLooping, setIsLooping] = useState(false);

	let music_id: string | undefined;
	let stepValue: string | undefined;
	let th: string | undefined;

	if (typeof step === 'string') {
		[music_id, stepValue, th] = step.split('_');
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await musicApi.getDetailMusic(
					music_id as string,
					stepValue as string,
					th as string,
				);
				setMusicDetail(data[0]);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [music_id, stepValue, th]);

	const handlePlay = async () => {
		if (videoRef.current) {
			await videoRef.current.playAsync();
		}
	};

	const handlePause = async () => {
		if (videoRef.current) {
			await videoRef.current.pauseAsync();
		}
	};

	const handleStop = async () => {
		if (videoRef.current) {
			await videoRef.current.stopAsync();
		}
	};

	const handleGoBack = () => {
		router.back();
	};

	const toggleLooping = () => {
		setIsLooping(prev => !prev);
	};

	const handleMyDance = () => {
		router.push({
			pathname: '/music/detail/my_camera',
			params: { videoLink: musicDetail.link },
		});
	};

	return (
		<View style={styles.container}>
			{musicDetail ? (
				<>
					<ImageBackground
						source={require('@/assets/images/header/sub-header.png')}
						style={styles.header}
						resizeMode="cover"
					>
						<View style={styles.titleContainer}>
							<View style={styles.topTitle}>
								<Text style={styles.moveName}> {musicDetail.move_name}</Text>
							</View>
							<View style={styles.rightTitle}>
								<Ionicons
									name="arrow-back"
									size={40}
									color="white"
									onPress={handleGoBack}
								/>
							</View>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.button} onPress={handlePlay}>
								<Text style={styles.buttonText}>재생 하기</Text>
								<Ionicons name="play" size={20} color="black" />
							</TouchableOpacity>
							<TouchableOpacity style={styles.button} onPress={handlePause}>
								<Text style={styles.buttonText}>일시 정지</Text>
								<Ionicons name="pause" size={20} color="black" />
							</TouchableOpacity>
							<TouchableOpacity style={styles.button} onPress={handleStop}>
								<Text style={styles.buttonText}>처음 부터</Text>
								<Ionicons name="stop" size={20} color="black" />
							</TouchableOpacity>
						</View>
					</ImageBackground>
					<View style={styles.videoContainer}>
						<Video
							ref={videoRef}
							source={{ uri: musicDetail.link }}
							style={styles.video}
							useNativeControls={false}
							resizeMode={ResizeMode.COVER}
							isLooping={isLooping}
						/>
						<View style={styles.bottomBtnContainer}>
							<TouchableOpacity
								style={styles.myDanceBtn}
								onPress={handleMyDance}
							>
								<Text style={styles.danceBtnText}>나의 춤 확인하기</Text>
								<Ionicons name="camera" size={20} color="white" />
							</TouchableOpacity>
						</View>
						<View style={styles.bottomContainer}>
							<TouchableOpacity
								style={[styles.bottomBtn, isLooping && styles.activeButton]}
								onPress={toggleLooping}
							>
								<Ionicons
									name={isLooping ? 'repeat' : 'repeat-outline'}
									size={30}
									color={isLooping ? '#3E69F4' : 'black'}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.subTitleContainer}>
						<Text>자막이 나오는곳입니다.</Text>
					</View>
				</>
			) : (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	header: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		height: height * 0.19,
	},
	title: {
		fontFamily: 'NanumSquareRound',
		fontSize: height * 0.02,
	},
	moveName: {
		fontFamily: 'NanumSquareRoundB',
		fontSize: height * 0.03,
		color: '#ffffff',
	},
	video: {
		width: '100%',
		height: height * 0.65,
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
	},
	buttonContainer: {
		position: 'absolute',
		bottom: height * 0.02,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '100%',
	},
	topTitle: {
		position: 'absolute',
		left: width * 0.05,
		paddingBottom: 10,
	},
	rightTitle: {
		position: 'absolute',
		right: width * 0.05,
		paddingBottom: 10,
	},
	button: {
		backgroundColor: 'white',
		borderRadius: 8,
		padding: 10,
		paddingLeft: 15,
		paddingRight: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 5,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	buttonText: {
		color: 'black',
		marginRight: 5,
		fontFamily: 'NanumSquareRoundB',
		fontSize: height * 0.015,
	},
	bottomBtnContainer: {
		position: 'absolute',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	subTitleContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	videoContainer: {
		position: 'relative',
		width: '100%',
		height: height * 0.65,
	},
	bottomBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 50,
		padding: 15,
		marginHorizontal: 5,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	myDanceBtn: {
		position: 'absolute',
		top: 10,
		backgroundColor: '#3E69F4',
		borderRadius: 12,
		padding: 10,
		paddingLeft: 15,
		paddingRight: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 5,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	bottomContainer: {
		position: 'absolute',
		right: width * 0.05,
		bottom: height * 0.02,
		alignItems: 'center',
	},
	danceBtnText: {
		padding: 3,
		color: 'white',
		fontFamily: 'NanumSquareRoundB',
		fontSize: height * 0.02,
		marginRight: 5,
	},
	activeButton: {
		backgroundColor: '#e0e0e0',
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
