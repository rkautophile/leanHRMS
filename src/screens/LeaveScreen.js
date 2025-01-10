import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { applyLeave } from '../services/api';

const LeaveScreen = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    const handleApplyLeave = async () => {
        const response = await applyLeave({ startDate, endDate, reason });
        if (response.status === 201) {
            Alert.alert('Success', 'Leave applied successfully');
        } else {
            Alert.alert('Error', 'Failed to apply leave');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Apply for Leave</Text>
            <TextInput
                style={styles.input}
                placeholder="Start Date (YYYY-MM-DD)"
                value={startDate}
                onChangeText={setStartDate}
            />
            <TextInput
                style={styles.input}
                placeholder="End Date (YYYY-MM-DD)"
                value={endDate}
                onChangeText={setEndDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Reason"
                value={reason}
                onChangeText={setReason}
            />
            <Button title="Apply Leave" onPress={handleApplyLeave} />
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
    input: {
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
});

export default LeaveScreen;
