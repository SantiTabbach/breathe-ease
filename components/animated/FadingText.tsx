import { SECOND } from '@/constants/Time';
import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import AnimatedText from './AnimatedText';
import { useThemeColor } from '@/hooks/useThemeColor';

type TextProps = React.ComponentProps<typeof Text>;

interface Props extends PropsWithChildren {
	durationIn?: number;
	durationOut?: number;
	delayIn?: number;
	delayOut?: number;
	textProps?: TextProps;
}
const FadingText = ({
	children,
	textProps,
	durationIn = SECOND,
	durationOut = SECOND,
	delayIn = SECOND,
	delayOut = SECOND,
}: Props) => {
	const [visible, setVisible] = useState(true);
	const color = useThemeColor({}, 'text');

	return (
		visible && (
			<AnimatedText
				durationIn={durationIn}
				delayIn={delayIn}
				textProps={{
					...textProps,
					style: [styles.text, { color }, textProps?.style],
				}}
				delayOut={delayOut}
				durationOut={durationOut}
				onAnimationEnd={() => setVisible(false)}
			>
				{children}
			</AnimatedText>
		)
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 40,
		fontWeight: '700',
	},
});

export default FadingText;
