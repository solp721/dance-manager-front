import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import * as Font from 'expo-font';

const { height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

	useEffect(() => {
		const loadFonts = async () => {
			await Font.loadAsync({
				NanumSquareRound: require('../assets/fonts/NanumSquareRoundR.ttf'),
			});
			setFontsLoaded(true);
			SplashScreen.hideAsync();
		};
		console.log(fontsLoaded);
		loadFonts();
	}, [fontsLoaded]);

	return (
		<Stack>
			<Stack.Screen
				name="(onboarding)"
				options={{
					headerBackTitle: '',
					headerShown: false,
					header: () => (
						<Image
							source={require('../assets/images/header/main-header.png')}
							resizeMode="cover"
							style={{ width: '100%', height: height * 0.18 }}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="home"
				options={{
					headerBackTitle: '',
					headerShown: true,
					header: () => (
						<Image
							source={require('../assets/images/header/main-header.png')}
							resizeMode="cover"
							style={{ width: '100%', height: height * 0.18 }}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="(category)"
				options={{
					headerShown: true,
					headerTitle: '카테고리 상세',
					headerBackTitle: '뒤로',
				}}
			/>
			<Stack.Screen name="+not-found" />
		</Stack>
	);
}
