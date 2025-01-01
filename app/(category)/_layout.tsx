import { Stack } from 'expo-router';
import { StyleSheet, Image, Dimensions, Text } from 'react-native';
import { useAtom } from 'jotai';
import { nameAtom } from '../../store/atoms/nameAtom';

const { width, height } = Dimensions.get('window');

export default function CategoryLayout() {
	const [nameData] = useAtom(nameAtom);

	return (
		<Stack>
			<Stack.Screen
				name="[name]"
				options={{
					headerBackTitle: '',
					headerShown: true,
					header: () => (
						<>
							<Image
								source={require('@/assets/images/header/sub-header.png')}
								style={styles.header}
							/>
							<Text style={styles.title}>{nameData} 노래 선택</Text>
						</>
					),
				}}
			/>
			<Stack.Screen
				name="music"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}

const styles = StyleSheet.create({
	title: {
		position: 'absolute',
		bottom: height * 0.03,
		left: width * 0.1,
		fontFamily: 'NanumSquareRound',
		fontSize: height * 0.025,
		color: '#ffffff',
	},
	header: {
		resizeMode: 'cover',
		width: '100%',
		height: height * 0.13,
	},
});
