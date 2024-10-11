import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface Props {
	label: string;
	values: Array<number>;
	onChangeValue: React.Dispatch<React.SetStateAction<number>>;
	selectedValue: number;
}

const Picker = ({ label, values, onChangeValue, selectedValue }: Props) => {
	const color = useThemeColor({}, 'text');

	return (
		<View style={styles.container}>
			<Text style={[styles.label, { color }]}>{label}</Text>
			<RNPicker
				style={styles.picker}
				itemStyle={{ color }}
				selectedValue={selectedValue}
				onValueChange={(itemValue) => onChangeValue(itemValue)}
			>
				{values.map((v) => (
					<RNPicker.Item key={v} label={v.toString()} value={v} />
				))}
			</RNPicker>
		</View>
	);
};

export default Picker;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	label: {
		textAlign: 'center',
		fontSize: 20,
	},
	picker: {
		flex: 1,
	},
});
