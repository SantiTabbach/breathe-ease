import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { EMPTY_STRING } from '@/constants/Common';
import { useThemeColor } from '@/hooks/useThemeColor';

type PressableProps = React.ComponentProps<typeof Pressable>;

interface Props extends PressableProps {
	children?: string;
}

const Button = ({ children = EMPTY_STRING, ...props }: Props) => {
	const color = useThemeColor({}, 'text');
	const backgroundColor = useThemeColor({}, 'tint');

	return (
		<Pressable {...props} style={[styles.button, { backgroundColor }]}>
			<Text style={[styles.title, { color }]}>{children}</Text>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		borderRadius: 16,
		height: 50,
	},
	title: {
		fontWeight: '600',
		fontSize: 16,
	},
});
