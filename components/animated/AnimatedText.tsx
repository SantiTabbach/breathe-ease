import { SECOND } from '@/constants/Time';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeOut, runOnJS } from 'react-native-reanimated';

type TextProps = React.ComponentProps<typeof Text>;

interface Props extends PropsWithChildren {
	durationIn?: number;
	durationOut?: number;
	delayIn?: number;
	delayOut?: number;
	textProps?: TextProps;
	onAnimationEnd?: (args?: any[]) => void;
}

const AnimatedText = ({
	children,
	textProps,
	durationIn = SECOND,
	durationOut = SECOND,
	delayIn = SECOND,
	delayOut = SECOND,
	onAnimationEnd,
}: Props) => {
	const color = useThemeColor({}, 'text');

	return (
		<Animated.Text
			entering={FadeIn.duration(durationIn)
				.delay(delayIn)
				.withCallback(() => onAnimationEnd && runOnJS(onAnimationEnd)())}
			exiting={FadeOut.duration(durationOut).delay(delayOut)}
			style={[styles.text, { color }, textProps?.style]}
		>
			{children}
		</Animated.Text>
	);
};

export default AnimatedText;

const styles = StyleSheet.create({
	text: {
		fontSize: 24,
		fontWeight: '600',
		marginTop: 20,
		textAlign: 'center',
	},
});
