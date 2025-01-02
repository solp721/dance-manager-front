import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';

export default function MyCamera() {
	const { videoLink } = useLocalSearchParams();

	const videoUri = Array.isArray(videoLink) ? videoLink[0] : videoLink;

	const [isLoading, setIsLoading] = useState(true);

	return (
		<View style={styles.container}>
			<View style={styles.videoContainer}>
				<Video
					source={{ uri: videoUri }}
					style={styles.video}
					useNativeControls={false}
					resizeMode={ResizeMode.COVER}
					isLooping={true}
					onLoad={() => setIsLoading(false)}
				/>
				{isLoading && (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#0000ff" />
					</View>
				)}
			</View>
			<View style={styles.cameraContainer}>
				<Text>카메라</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	video: {
		width: '100%',
		flex: 1,
	},
	videoContainer: {
		flex: 1,
		position: 'relative',
		width: '100%',
	},
	cameraContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		width: '100%',
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
