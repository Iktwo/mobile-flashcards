import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync());
}

function createNotification(title, body) {
    return {
        title,
        body,
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let date = new Date();
                            date.setHours(20);
                            date.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(createNotification('Take a quiz', 'Remember to study'), {
                                time: date
                            });

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}