declare module 'react-native-indicators' {
	import { Component } from 'react';

	interface IndicatorProps {
		animationEasing?: (value: number) => number;
		animationDuration?: number;
		count?: number;
		color?: string;
		size?: number;
		waveFactor?: number;
		waveMode?: 'fill' | 'outline';
		interaction?: boolean;
	}

	export class BarIndicator extends Component<IndicatorProps> {}
}
