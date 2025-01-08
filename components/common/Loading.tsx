import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarIndicator } from 'react-native-indicators';

interface LoadingProps {
	color?: string;
	size?: number;
	count?: number;
	waveFactor?: number;
}

export function Loading({
	color = '#538BDD',
	size = 80,
	count = 4,
	waveFactor = 0.54,
}: LoadingProps) {
	return (
		<View style={styles.container}>
			<View style={styles.loadingContainer}>
				<BarIndicator
					key="loading-indicator"
					color={color}
					size={size}
					count={count}
					waveFactor={waveFactor}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
	},
	loadingContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
