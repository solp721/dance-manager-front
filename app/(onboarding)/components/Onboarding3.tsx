import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingChildren3() {
	return (
		<View style={styles.container}>
			<Image
				source={require('@/assets/images/onboarding/third-onboarding.png')}
				style={styles.onboarding}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	onboarding: {
		position: 'absolute',
		resizeMode: 'contain',
		top: 180,
		height: height * 0.65,
	},
});
