export default {
	expo: {
		ios: {
			bundleIdentifier: 'com.yourapp.identifier',
		},
		extra: {
			apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
			eas: {
				projectId: 'dd6e189d-c311-4f02-9f6c-53c8daf64979',
			},
		},
	},
};
