import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomHeaderButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        {title && <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // For aligning icon and text
    },
    buttonText: {
        color: '#fff',
        fontWeight: 500,
        fontSize: 18,
    },
});

export default CustomHeaderButton;