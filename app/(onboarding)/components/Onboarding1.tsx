import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingChildren1() {
	return (
		<View style={styles.container}>
			<Image
				source={require('@/assets/images/onboarding/first-onboarding.png')}
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
		width: width * 0.9,
		height: height * 0.55,
	},
});
