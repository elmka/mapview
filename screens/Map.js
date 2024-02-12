import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'

export default function Map({ location, mapType }) {
    const [marker, setMarker] = useState(null);

    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate;
        setMarker(coords);
    }

    return (
        <>
            <MapView
                style={styles.map}
                region={location}
                mapType={mapType}
                onLongPress={showMarker}
            >
                {marker &&
                    <Marker
                        title="My marker"
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                    />
                }
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
});