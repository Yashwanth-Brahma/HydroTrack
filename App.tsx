import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useHydrationStore } from './src/store/useHydrationStore';
import { WaterRing } from './src/components/WaterRing';
import { FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const entries = useHydrationStore((state) => state.entries);
  const addEntry = useHydrationStore((state) => state.addEntry);
  const goal = useHydrationStore((state) => state.goal);
  const setGoal = useHydrationStore((s) => s.setGoal);
  const [draft, setDraft] = useState(String(goal)); // local draft, seeded from current goal
  const QUICK_ADD_AMOUNTS = [100, 250, 500];

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); // snap to local midnight
  const startTs = startOfToday.getTime();

  const todayEntries = entries.filter((entry) => entry.timestamp >= startTs);
  const total = todayEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const completionPercent = Math.min(100, Math.round((total / goal) * 100));

  const saveGoal = () => {
    if (!isNaN(Number(draft)) && Number(draft) > 0) {
      setGoal(Number(draft));
    } else {
      alert('Please enter a valid positive number for the goal.');
    }
  };

  return (
    <View style={styles.container}>
      <WaterRing percent={completionPercent} />
      <Text style={styles.total}>{total} ml</Text>
      <Text>Daily Goal: {goal} ml</Text>
      <TextInput
        value={draft}
        onChangeText={setDraft}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 120, textAlign: 'center', borderRadius: 8 }}
      />
      <Button title="Save Goal" onPress={saveGoal} />
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {QUICK_ADD_AMOUNTS.map((amount) => (
          <Button
            key={amount}
            title={`+${amount} ml`}
            onPress={() => addEntry(amount)}
          />
        ))}
      </View>
      <View style={{ height: 200, maxHeight: 200, width: '100%' }}>
        <FlatList
          data={[...todayEntries].reverse()} // show newest first
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{item.amount} ml</Text>
              <Text>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
          )}
          style={{ width: '100%' }}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 24 }}
          ListEmptyComponent={<Text>No water logged yet today.</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 },
  total: { fontSize: 48, fontWeight: 'bold' },
});