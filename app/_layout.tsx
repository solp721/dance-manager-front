import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Image } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerBackTitle: '',
					headerShown: true,
					header: () => (
						<Image
							source={require('../assets/images/header/main-header.png')}
							style={{
								width: '100%',
							}}
							resizeMode="cover"
						/>
					),
				}}
			/>
			<Stack.Screen
				name="screens/category/[name]"
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
