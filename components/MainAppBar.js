import React from 'react'
import { Appbar } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements'

export default function MainAppBar({ backgroundColor, title, icon, getUserPosition, back, navigation }) {
    return (
        <Appbar.Header style={{ backgroundColor: backgroundColor }}>
            {back ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
            <Appbar.Content title={title} />
            {back ? null : <Appbar.Action icon={icon} onPress={getUserPosition} />}
            {back ? null : <Appbar.Action icon='cog' onPress={() => navigation.navigate('Settings')} />}
        </Appbar.Header>
    )
}