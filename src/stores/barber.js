import { defineStore } from 'pinia';
import storage from '@/utils/storage';
import { mockBarbers, mockSchedule } from '@/mock/data';

export const useBarberStore = defineStore('barber', {
    state: () => ({
        barbers: mockBarbers,
        myServices: storage.get('barber_services', mockBarbers[0].services),
        mySchedule: storage.get('barber_schedule', mockSchedule),
        myPortfolio: storage.get('barber_portfolio', mockBarbers[0].portfolio),
        achievements: storage.get('barber_achievements', ['Top 10', 'Master'])
    }),
    actions: {
        addService(service) {
            this.myServices.push({ ...service, id: Date.now().toString() });
            storage.set('barber_services', this.myServices);
        },
        updateService(id, updatedService) {
            const index = this.myServices.findIndex(s => s.id === id);
            if (index !== -1) {
                this.myServices[index] = { ...updatedService, id };
                storage.set('barber_services', this.myServices);
            }
        },
        deleteService(id) {
            this.myServices = this.myServices.filter(s => s.id !== id);
            storage.set('barber_services', this.myServices);
        },
        updateSchedule(schedule) {
            this.mySchedule = schedule;
            storage.set('barber_schedule', this.mySchedule);
        }
    }
});
