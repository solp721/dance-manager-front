import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
	StyleSheet,
	View,
	Image,
	Dimensions,
	TouchableOpacity,
	Text,
} from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SelectionScreen() {
	const router = useRouter();

	const HomeHandler = () => {
		router.replace('/home');
	};

	return (
		<LinearGradient
			colors={['#3E69F4', '#2B52D4']}
			locations={[0.58, 1]}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={styles.container}
		>
			<View style={styles.content}>
				<Image
					source={require('@/assets/images/circle/circle.png')}
					style={styles.circle}
				/>
				<Image
					source={require('@/assets/images/logo/logo.png')}
					style={styles.image}
				/>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button}>
						<Link href="/onboarding">
							<Text style={styles.buttonText}>처음 사용하시나요?</Text>
						</Link>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={HomeHandler}>
						<Text style={styles.buttonText}>춤배워보기</Text>
					</TouchableOpacity>
				</View>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		position: 'absolute',
		top: height * 0.08,
		resizeMode: 'cover',
		width: width * 1,
		height: height * 0.5,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: height * 0.16,
		gap: 40,
	},
	circle: {
		position: 'absolute',
		top: 0,
		left: 0,
		resizeMode: 'cover',
		width: width * 1,
		height: height * 0.35,
	},
	button: {
		backgroundColor: 'white',
		width: width * 0.8,
		height: height * 0.07,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 36,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8,
	},
	buttonText: {
		fontFamily: 'NanumSquareRound',
		fontSize: height * 0.025,
	},
});
