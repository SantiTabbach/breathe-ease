import { useEffect, useState } from 'react';
import { SECOND } from '@/constants/Time';
import { Phases } from '@/enums/Breathe';

interface Args {
	inhaleDuration: number;
	holdDuration: number;
	exhaleDuration: number;
}

const useBreathe = ({ inhaleDuration, holdDuration, exhaleDuration }: Args) => {
	const [currentPhase, setCurrentPhase] = useState(Phases.INHALE);

	useEffect(() => {
		const cycleBreathPhases = () => {
			setCurrentPhase(Phases.INHALE);

			setTimeout(() => {
				setCurrentPhase(Phases.HOLD);
			}, inhaleDuration - SECOND);

			setTimeout(() => {
				setCurrentPhase(Phases.EXHALE);
			}, inhaleDuration + holdDuration - SECOND);

			setTimeout(() => {
				setCurrentPhase(Phases.INHALE);
			}, inhaleDuration + holdDuration + exhaleDuration - SECOND);
		};

		cycleBreathPhases();

		const intervalId = setInterval(
			cycleBreathPhases,
			inhaleDuration + holdDuration + exhaleDuration
		);

		return () => clearInterval(intervalId);
	}, [inhaleDuration, holdDuration, exhaleDuration]);

	return { currentPhase };
};

export default useBreathe;
