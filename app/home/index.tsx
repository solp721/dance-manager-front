import {
	StyleSheet,
	View,
	Dimensions,
	TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
	return (
		<ScrollView contentContainerStyle={styles.scrollViewContent}>
			<View style={styles.cardContainer}>
				<View style={styles.row}>
					<Link href="/kpop" asChild>
						<TouchableOpacity style={styles.card}>
							<View style={styles.cardBackground}>
								<Image
									source={require('../../assets/images/category/kpop.png')}
									style={styles.cardImage}
								/>
							</View>
						</TouchableOpacity>
					</Link>
					<Link href="/shortform" asChild>
						<TouchableOpacity style={styles.card}>
							<View style={styles.cardBackground}>
								<Image
									source={require('../../assets/images/category/shortform.png')}
									style={styles.cardImage}
								/>
							</View>
						</TouchableOpacity>
					</Link>
				</View>
				<View style={styles.row}>
					<Link href="/trot" asChild>
						<TouchableOpacity style={styles.card}>
							<View style={styles.cardBackground}>
								<Image
									source={require('../../assets/images/category/trot.png')}
									style={styles.cardImage}
								/>
							</View>
						</TouchableOpacity>
					</Link>
					<Link href="/create" asChild>
						<TouchableOpacity style={styles.card}>
							<View style={styles.cardBackground}>
								<Image
									source={require('../../assets/images/category/create.png')}
									style={styles.cardImage}
								/>
							</View>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollViewContent: {
		flexGrow: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	cardContainer: {
		width: width * 0.9,
		marginTop: height * 0.05,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.35,
		shadowRadius: 4,
		elevation: 8,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: height * 0.01,
	},
	card: {
		width: width * 0.42,
		height: width * 0.65,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 7,
		marginVertical: 5,
	},
	cardBackground: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	cardImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
});
