import { defineStore } from 'pinia';
import storage from '@/utils/storage';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        role: storage.get('user_role', null), // 'mijoz' | 'sartarosh'
        user: storage.get('user_data', null),
        isAuthenticated: !!storage.get('user_data', null) // Change to rely on user_data presence
    }),
    actions: {
        setRole(role) {
            this.role = role;
            storage.set('user_role', role);
            // Do NOT set isAuthenticated = true here anymore
        },
        async login(phone, password) {
            // Mock Database
            const mockUsers = [
                {
                    id: 1,
                    role: 'mijoz',
                    phone: '+998 90 123 45 67',
                    password: '123',
                    name: 'Azizbek',
                    address: 'Toshkent, Chilonzor'
                },
                {
                    id: 2,
                    role: 'sartarosh',
                    phone: '+998 90 987 65 43',
                    password: '123',
                    name: 'Sirojiddin',
                    address: 'Toshkent, Yunusobod',
                    location: { lat: 41.3645, lng: 69.2965 } // Sample location
                }
            ];

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const user = mockUsers.find(u => u.phone === phone && u.password === password);
                    
                    if (!user) {
                        return reject("Telefon raqam yoki parol noto'g'ri");
                    }

                    if (user.role !== this.role) {
                        return reject("Bunday foydalanuvchi topilmadi (rol mos kelmadi)");
                    }

                    // Success
                    this.user = user;
                    this.isAuthenticated = true;
                    storage.set('user_data', user);
                    resolve(user);
                }, 800); // Simulate network delay
            });
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
