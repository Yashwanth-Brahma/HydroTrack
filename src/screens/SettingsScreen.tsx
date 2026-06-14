import { View, Text, Button, StyleSheet, TextInput, Platform } from 'react-native';
import { useHydrationStore } from '../store/useHydrationStore';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { scheduleReminder } from '../lib/notifications';

const SettingsScreen = () => {

    const goal = useHydrationStore((state) => state.goal);
    const setGoal = useHydrationStore((s) => s.setGoal);
    const [draft, setDraft] = useState(String(goal)); // local draft, seeded from current goal
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const saveGoal = () => {
        if (Number(draft) > 0) {
            setGoal(Number(draft));
        } else {
            alert('Please enter a valid positive number for the goal.');
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                value={draft}
                onChangeText={setDraft}
                keyboardType="numeric"
                style={{ borderWidth: 1, padding: 8, width: 120, textAlign: 'center', borderRadius: 8 }}
            />
            <Button title="Save Goal" onPress={saveGoal} />
            <Button title="Back" onPress={() => navigation.goBack()} />
            <Button title="Schedule Reminder" onPress={() => {scheduleReminder()}} />
        </View>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 },
});