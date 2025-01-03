import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingChildren2() {
	return (
		<View style={styles.container}>
			<Image
				source={require('@/assets/images/onboarding/second-onboarding.png')}
				style={styles.onboarding}
			/>
			{/* <View style={styles.iconContainer}>
				<Image
					source={require('@/assets/images/onboarding/smile-icon.png')}
					style={styles.smileIcon}
				/>
			</View> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		width: '100%',
	},
	onboarding: {
		position: 'absolute',
		resizeMode: 'contain',
		width: width * 0.9,
		height: height * 0.55,
	},
	iconContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	smileIcon: {
		resizeMode: 'contain',
		width: width * 0.2,
	},
});
