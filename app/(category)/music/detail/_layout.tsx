import { Stack } from 'expo-router';

export default function DetailMusicMovementLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="[step]"
				options={{
					headerBackTitle: '',
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
