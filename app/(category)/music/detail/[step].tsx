import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Button,
	ActivityIndicator,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { musicApi } from '@/api/music';

const { height } = Dimensions.get('window');

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

	return (
		<View style={styles.container}>
			{musicDetail ? (
				<>
					<View style={styles.header}>
						<Text style={styles.title}>
							{stepValue} 단계 {th}번 동작 -
							<Text style={styles.moveName}> {musicDetail.move_name}</Text>
						</Text>
						<Button title="이전 화면으로" onPress={handleGoBack} />
						<View style={styles.buttonContainer}>
							<Button title="재생" onPress={handlePlay} />
							<Button title="일시 정지" onPress={handlePause} />
							<Button title="처음부터" onPress={handleStop} />
						</View>
					</View>
					<Video
						ref={videoRef}
						source={{ uri: musicDetail.link }}
						style={styles.video}
						useNativeControls={false}
						resizeMode={ResizeMode.COVER}
						isLooping={isLooping}
					/>
					<View>
						<Button
							title={isLooping ? '반복 해제' : '반복 재생'}
							onPress={toggleLooping}
						/>
					</View>
				</>
			) : (
				<ActivityIndicator size="large" color="#007BFF" />
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
		height: height * 0.2,
		backgroundColor: '#538bde',
	},
	title: {
		marginTop: height * 0.05,
	},
	moveName: {
		fontWeight: 'bold',
		color: '#007BFF',
	},
	video: {
		width: '100%',
		height: height * 0.6,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginTop: 10,
	},
});
