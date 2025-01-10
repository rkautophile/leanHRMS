import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { punchAttendance } from '../services/api';

const AttendanceScreen = () => {
    const [location, setLocation] = useState(null);

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`${latitude}, ${longitude}`);
            },
            (error) => {
                Alert.alert('Error', 'Unable to fetch location');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const handlePunch = async () => {
        if (!location) {
            Alert.alert('Error', 'Location not captured');
            return;
        }
        const response = await punchAttendance({ location, time: new Date() });
        if (response.status === 201) {
            Alert.alert('Success', 'Attendance punched successfully');
        } else {
            Alert.alert('Error', 'Failed to punch attendance');
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Punch Attendance</Text>
            <Text>Location: {location || 'Fetching...'}</Text>
            <Button title="Punch" onPress={handlePunch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default AttendanceScreen;
