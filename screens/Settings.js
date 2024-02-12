import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'

export default function Settings({ backgroundColor, mapType, setMapType }) {
    const [selectedType, setSelectedType] = useState(mapType);

    return (
        <View style={styles.settingsArea}>
            <Text style={[styles.heading, { color: backgroundColor }]}>Map type</Text>
            <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue) => {
                    setSelectedType(itemValue);
                    setMapType(itemValue);
                }}
            >
                <Picker.Item label="Standard" value="standard" />
                <Picker.Item label="Terrain" value="terrain" />
                <Picker.Item label="Satellite" value="satellite" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsArea: {
        marginTop: 32,
        marginLeft: 16
    },
    heading: {
        textTransform: 'uppercase'
    }
})