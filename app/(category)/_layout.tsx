import { Stack } from 'expo-router';

export default function CategoryLayout() {
	return (
		<Stack>
			<Stack.Screen name="[name]" options={{ headerShown: false }} />
		</Stack>
	);
}
