import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export type Entry = {
    id: string;
    amount: number;    // ml
    timestamp: number; // Date.now()
};

type HydrationState = {
    entries: Entry[];
    goal: number; // Daily goal in ml
    setGoal: (goal: number) => void;
    addEntry: (amount: number) => void;
};

export const useHydrationStore = create<HydrationState>()(
    persist(
        (set) => ({
            entries: [],
            goal: 2000, // Default goal in ml
            setGoal: (goal) => set({ goal }),
            addEntry: (amount) => {
                const newEntry: Entry = {
                    id: Crypto.randomUUID(),
                    amount,
                    timestamp: Date.now(),
                };
                set((state) => ({
                    entries: [...state.entries, newEntry],
                }))
            },
        }),
        {
            name: 'hydration-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);