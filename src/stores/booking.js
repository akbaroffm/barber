import { defineStore } from 'pinia';
import storage from '@/utils/storage';
import { useNotificationStore } from './notification';

export const useBookingStore = defineStore('booking', {
    state: () => ({
        bookings: storage.get('bookings', [])
    }),
    actions: {
        addBooking(booking) {
            const newBooking = {
                ...booking,
                id: Date.now().toString(),
                status: 'yangi', // 'yangi', 'tasdiqlangan', 'bajarilgan', 'bekor'
                createdAt: new Date().toISOString()
            };
            this.bookings.push(newBooking);
            storage.set('bookings', this.bookings);
            
            const notificationStore = useNotificationStore();
            notificationStore.addNotification({
                title: 'Yangi buyurtma',
                message: `${booking.clientName} dan yangi buyurtma keldi.`,
                type: 'info'
            });
        },
        async updateBookingStatus(id, status) {
            const index = this.bookings.findIndex(b => b.id === id);
            if (index !== -1) {
                this.bookings[index].status = status;
                storage.set('bookings', this.bookings);
                
                const notificationStore = useNotificationStore();
                const booking = this.bookings[index];
                
                if (status === 'tasdiqlangan') {
                    notificationStore.addNotification({
                        title: 'Bron tasdiqlandi',
                        message: `Sizning ${booking.serviceName} uchun broningiz tasdiqlandi.`,
                        type: 'success'
                    });
                } else if (status === 'bajarilgan') {
                    const { useFinanceStore } = await import('./finance');
                    const financeStore = useFinanceStore();
                    financeStore.addIncomeFromBooking(booking);
                } else if (status === 'bekor') {
                    notificationStore.addNotification({
                        title: 'Bron rad etildi',
                        message: `Afsuski, usta sizning broningizni rad etdi.`,
                        type: 'error'
                    });
                }
            }
        }
    }
});
