import { Stack } from 'expo-router';

export default function DetailMusicLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="[musicId]"
				options={{
					headerBackTitle: '',
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="detail"
				options={{
					headerBackTitle: '',
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
