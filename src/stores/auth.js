import { defineStore } from 'pinia';
import storage from '@/utils/storage';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        role: storage.get('user_role', null), // 'mijoz' | 'sartarosh'
        user: storage.get('user_data', null),
        isAuthenticated: !!storage.get('user_role', null)
    }),
    actions: {
        setRole(role) {
            this.role = role;
            this.isAuthenticated = true;
            storage.set('user_role', role);
        },
        setUser(user) {
            this.user = user;
            storage.set('user_data', user);
        },
        logout() {
            this.role = null;
            this.user = null;
            this.isAuthenticated = false;
            storage.remove('user_role');
            storage.remove('user_data');
        }
    }
});
