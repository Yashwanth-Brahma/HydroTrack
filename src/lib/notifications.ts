import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'Hydration reminders',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,   // newer SDKs; older ones use shouldShowAlert: true
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const scheduleReminder = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission for notifications was denied. Please enable it in settings to receive hydration reminders.');
      return;
    }
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to Hydrate! 💧",
        body: "Don't forget to drink some water!"
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5
      }
    });
  }