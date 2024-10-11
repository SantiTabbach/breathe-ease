import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Breathe from '@/components/breathe/Breathe';
import Picker from '@/components/ui/Picker';
import { generateElementsArray } from '@/utils/Array';
import { router } from 'expo-router';
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	ZoomIn,
} from 'react-native-reanimated';
import { SECOND } from '@/constants/Time';
import { DEFAULT_OPTIONS, OPTIONS } from '@/constants/Breathe';
import { useThemeColor } from '@/hooks/useThemeColor';

const index = () => {
	const [breatheInSec, setBreatheInSec] = useState<number>(DEFAULT_OPTIONS.IN);
	const [holdSec, setHoldSec] = useState<number>(DEFAULT_OPTIONS.HOLD);
	const [breatheOutSec, setBreatheOutSec] = useState<number>(
		DEFAULT_OPTIONS.OUT
	);
	const backgroundColor = useThemeColor({}, 'backgroundColor');
	const color = useThemeColor({}, 'text');

	const handlePress = () => {
		router.push({
			pathname: '/breathe-session',
			params: {
				breatheInSec,
				holdSec,
				breatheOutSec,
			},
		});
	};

	return (
		<SafeAreaView style={[styles.screen, { backgroundColor }]}>
			<View style={styles.container}>
				<Text style={[styles.title, { color }]}>Breathe ease</Text>
				<Animated.View
					style={{ flex: 1 }}
					exiting={FadeOut.duration(SECOND * 1.5)}
					entering={ZoomIn.duration(SECOND * 3).easing(Easing.elastic(1))}
				>
					<Breathe />
				</Animated.View>
				<Animated.View
					style={styles.pickers}
					exiting={FadeOut.duration(SECOND)}
					entering={FadeIn.duration(SECOND * 3)}
				>
					<Picker
						label="Breathe In"
						onChangeValue={setBreatheInSec}
						selectedValue={breatheInSec}
						values={generateElementsArray(OPTIONS)}
					/>
					<Picker
						label="Hold"
						onChangeValue={setHoldSec}
						selectedValue={holdSec}
						values={generateElementsArray(OPTIONS)}
					/>
					<Picker
						label="Breathe Out"
						onChangeValue={setBreatheOutSec}
						selectedValue={breatheOutSec}
						values={generateElementsArray(OPTIONS)}
					/>
				</Animated.View>
				<Button onPress={handlePress}>Start session</Button>
			</View>
		</SafeAreaView>
	);
};

export default index;

const styles = StyleSheet.create({
	screen: { flex: 1 },
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 40,
		fontWeight: '700',
	},
	pickers: { flex: 1, flexDirection: 'row' },
});
