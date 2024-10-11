import { StyleSheet } from 'react-native';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SECOND } from '@/constants/Time';
import Breathe from './Breathe';
import AnimatedText from '../animated/AnimatedText';
import { Phases } from '@/enums/Breathe';
import useBreathe from '@/hooks/useBreathe';
import { useLocalSearchParams } from 'expo-router';

const PhasesComponent = () => {
	const { breatheInSec, holdSec, breatheOutSec } = useLocalSearchParams();
	const { currentPhase } = useBreathe({
		inhaleDuration: +breatheInSec * SECOND,
		holdDuration: +holdSec * SECOND,
		exhaleDuration: +breatheOutSec * SECOND,
	});

	return (
		<React.Fragment>
			<Animated.View
				style={styles.breathe}
				exiting={FadeOut.duration(SECOND * 1.5)}
				entering={FadeIn.duration(SECOND * 3)}
			>
				<Breathe
					inDuration={+breatheInSec}
					holdDuration={+holdSec}
					outDuration={+breatheOutSec}
				/>
			</Animated.View>
			<Animated.View
				style={styles.phases}
				exiting={FadeOut.duration(SECOND * 1.5)}
				entering={FadeIn.duration(SECOND * 3)}
			>
				{currentPhase === Phases.INHALE && (
					<AnimatedText>Now inhale...</AnimatedText>
				)}
				{currentPhase === Phases.HOLD && <AnimatedText>Hold.</AnimatedText>}
				{currentPhase === Phases.EXHALE && (
					<AnimatedText>...and exhale.</AnimatedText>
				)}
			</Animated.View>
		</React.Fragment>
	);
};

export default PhasesComponent;

const styles = StyleSheet.create({
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
