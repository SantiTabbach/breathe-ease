import { generateElementsArray } from '@/utils/Array';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const CIRCLE_WIDTH = width / 3;

export const CIRCLES = generateElementsArray(8);

export const OPTIONS = 60;

export const DEFAULT_OPTIONS = {
	IN: 7,
	HOLD: 4,
	OUT: 7,
};
