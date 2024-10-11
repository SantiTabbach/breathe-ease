import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SECOND } from '@/constants/Time';
import FadingText from '@/components/animated/FadingText';
import Button from '@/components/ui/Button';

import PhasesComponent from '@/components/breathe/Phases';
import { useThemeColor } from '@/hooks/useThemeColor';

// Delay represented by the duration of the initial message
const BREATHE_DELAY = SECOND * 8;

const BreatheSessionScreen = () => {
	const [renderPhases, setRenderPhases] = useState(false);
	const backgroundColor = useThemeColor({}, 'backgroundColor');

	useEffect(() => {
		{
			setTimeout(() => {
				setRenderPhases(true);
			}, BREATHE_DELAY);
		}
	}, []);

	return (
		<SafeAreaView style={[styles.screen, { backgroundColor }]}>
			<View style={styles.container}>
				<FadingText
					durationIn={SECOND * 2}
					durationOut={SECOND * 2}
					textProps={{ style: styles.message }}
				>
					Be still, and bring your attention to your breath.
				</FadingText>
				{renderPhases && <PhasesComponent />}
			</View>
			<Button onPress={() => router.back()}>Finish session</Button>
		</SafeAreaView>
	);
};

export default BreatheSessionScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: 16,
	},
	container: {
		flex: 1,
		position: 'relative',
	},
	message: {
		flex: 1,
		top: 300,
		textAlign: 'center',
		position: 'absolute',
	},
	breathe: {
		flex: 1,
		top: 300,
		alignSelf: 'center',
		position: 'absolute',
	},
	phases: {
		flex: 1,
		top: 500,
		alignSelf: 'center',
		alignItems: 'center',
		position: 'absolute',
		width: '100%',
	},
});
