import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	Button,
	ImageBackground,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function MyCamera() {
	const { videoLink } = useLocalSearchParams();

	const videoUri = Array.isArray(videoLink) ? videoLink[0] : videoLink;

	const [isLoading, setIsLoading] = useState(true);

	const [permission, requestPermission] = useCameraPermissions();
	const [showCountdown, setShowCountdown] = useState(true);
	const [countdown, setCountdown] = useState(3);
	const [countdownText, setCountdownText] = useState('');

	useEffect(() => {
		if (showCountdown) {
			const timer = setInterval(() => {
				setCountdown(prev => {
					if (prev === 1) {
						clearInterval(timer);
						setCountdownText('Start!!');
						setShowCountdown(false);
						setTimeout(() => {
							setCountdownText('');
						}, 1000);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
			return () => clearInterval(timer);
		}
	}, [showCountdown]);

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					나의 춤을 보기위해 카메라 권환이 필요합니다!
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.videoContainer}>
				{showCountdown || countdownText ? (
					<ImageBackground source={{ uri: videoUri }} style={styles.video}>
						<View style={styles.overlay}>
							<Text style={styles.countdownText}>
								{countdown > 0 ? countdown : countdownText}
							</Text>
						</View>
					</ImageBackground>
				) : (
					<Video
						source={{ uri: videoUri }}
						style={styles.video}
						useNativeControls={false}
						resizeMode={ResizeMode.COVER}
						isLooping={true}
						shouldPlay={true}
						onLoad={() => setIsLoading(false)}
					/>
				)}
				{isLoading && (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#538BDE" />
					</View>
				)}
			</View>
			<View style={styles.cameraContainer}>
				<CameraView style={styles.camera} facing={'front'} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	video: {
		width: '100%',
		flex: 1,
		marginTop: -150,
	},
	videoContainer: {
		flex: 1,
		position: 'relative',
		width: '100%',
	},
	cameraContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	loadingContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	overlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	countdownText: {
		fontSize: 48,
		fontFamily: 'NanumSquareRoundB',
		color: '#538BDE',
	},
});
