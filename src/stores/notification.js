import { defineStore } from 'pinia';
import storage from '@/utils/storage';
import { mockNotifications } from '@/mock/data';

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: storage.get('notifications', mockNotifications)
    }),
    actions: {
        addNotification(notification) {
            this.notifications.unshift({
                ...notification,
                id: Date.now(),
                time: new Date().toISOString(),
                read: false
            });
            storage.set('notifications', this.notifications);
        },
        markAsRead(id) {
            const notification = this.notifications.find(n => n.id === id);
            if (notification) {
                notification.read = true;
                storage.set('notifications', this.notifications);
            }
        },
        clearAll() {
            this.notifications = [];
            storage.set('notifications', []);
        }
    },
    getters: {
        unreadCount: (state) => state.notifications.filter(n => !n.read).length
    }
});
