import React, { useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { CIRCLE_WIDTH, CIRCLES } from '@/constants/Breathe';
import { SECOND } from '@/constants/Time';
import { useThemeColor } from '@/hooks/useThemeColor';

interface Props {
	inDuration?: number;
	outDuration?: number;
	holdDuration?: number;
}

const Breathe = ({
	inDuration = 7,
	outDuration = 7,
	holdDuration = 4,
}: Props) => {
	const backgroundColor = useThemeColor({}, 'text');
	const move = useRef(new Animated.Value(0)).current;

	Animated.loop(
		Animated.sequence([
			Animated.timing(move, {
				toValue: 1,
				duration: inDuration * SECOND,
				useNativeDriver: true,
			}),
			Animated.timing(move, {
				delay: holdDuration * SECOND,
				toValue: 0,
				duration: outDuration * SECOND,
				useNativeDriver: true,
			}),
		])
	).start();

	const translate = move.interpolate({
		inputRange: [0, 1],
		outputRange: [0, CIRCLE_WIDTH / 6],
	});

	return (
		<View style={styles.container}>
			{CIRCLES.map((item) => {
				const rotation = move.interpolate({
					inputRange: [0, 1],
					outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
				});

				return (
					<Animated.View
						key={item}
						style={[
							styles.circle,
							{ backgroundColor },
							{
								transform: [
									{
										rotateZ: rotation,
									},
									{ translateX: translate },
									{ translateY: translate },
								],
							},
						]}
					/>
				);
			})}
		</View>
	);
};

export default React.memo(Breathe);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	circle: {
		position: 'absolute',
		width: CIRCLE_WIDTH,
		height: CIRCLE_WIDTH,
		borderRadius: CIRCLE_WIDTH / 2,
		opacity: 0.1,
	},
});
