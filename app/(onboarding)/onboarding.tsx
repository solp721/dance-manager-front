import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import OnboardingChildren1 from './components/Onboarding1';
import OnboardingChildren2 from './components/Onboarding2';
import OnboardingChildren3 from './components/Onboarding3';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const slides = [
	{
		key: '1',
		image: <OnboardingChildren1 />,
	},
	{
		key: '2',
		image: <OnboardingChildren2 />,
	},
	{
		key: '3',
		image: <OnboardingChildren3 />,
	},
];

export default function OnboardingScreen() {
	const router = useRouter();

	const renderItem = ({
		item,
	}: {
		item: { key: string; image: JSX.Element };
	}) => {
		const subTitleText =
			item.key === '1'
				? '일상 생활에 활력소를 !'
				: item.key === '2'
					? '여러 장르로 다양한 춤을 !'
					: '배워 나가는 재미 !';

		return (
			<LinearGradient
				colors={['#3E69F4', '#2B52D4']}
				locations={[0.58, 1]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={styles.container}
			>
				<View style={styles.container}>
					<>
						<View style={styles.titlecontainer}>
							<Text style={styles.title}>DANCE MANAGER</Text>
						</View>
						<Text style={styles.subTitle}>{subTitleText}</Text>
					</>
					<View key={item.key}>{item.image}</View>
				</View>
			</LinearGradient>
		);
	};

	const renderNextButton = () => {
		return (
			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<Text style={styles.buttonText}>다음</Text>
				</View>
			</View>
		);
	};

	const renderDoneButton = () => {
		return (
			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<Text style={styles.buttonText}>완료</Text>
				</View>
			</View>
		);
	};

	return (
		<AppIntroSlider
			bottomButton={true}
			renderItem={renderItem}
			data={slides}
			renderNextButton={renderNextButton}
			renderDoneButton={renderDoneButton}
			onDone={() => {
				router.replace('/home');
			}}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titlecontainer: {
		position: 'absolute',
		top: height * 0.05,
		backgroundColor: 'rgba(0, 56, 210, 0.7)',
		height: '5%',
		alignItems: 'center',
		justifyContent: 'center',
		width: width * 0.66,
		borderRadius: 26,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 8,
	},
	title: {
		fontFamily: 'NanumSquareRoundOTF',
		fontSize: width * 0.06,
		color: '#ffffff',
	},
	subTitle: {
		position: 'absolute',
		top: height * 0.12,
		fontFamily: 'NanumSquareRoundOTF',
		fontSize: width * 0.06,
		color: '#ffffff',
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
	buttonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
