import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
	return (
		<View style={styles.container}>
			<Text>준비중...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
});
