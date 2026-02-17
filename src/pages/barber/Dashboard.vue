<template>
  <div class="flex flex-col pb-20">
    <TopBar title="Sartarosh paneli" />
    
    <div class="px-4 mt-6 space-y-6">
      <!-- Stats Overview -->
      <div class="grid grid-cols-2 gap-4">
        <Card class="p-4 bg-blue-50 border-blue-100 flex flex-col items-center">
          <span class="text-xs text-blue-600 font-bold uppercase mb-1">Bugun</span>
          <span class="text-3xl font-extrabold text-blue-800">{{ todayBookings.length }}</span>
          <span class="text-[10px] text-blue-500">ta navbat</span>
        </Card>
        <Card class="p-4 bg-green-50 border-green-100 flex flex-col items-center">
          <span class="text-xs text-green-600 font-bold uppercase mb-1">Mijozlar</span>
          <span class="text-3xl font-extrabold text-green-800">{{ uniqueClientsCount }}</span>
          <span class="text-[10px] text-green-500">jami</span>
        </Card>
      </div>
      
      <!-- Quick Actions -->
      <div>
        <h3 class="font-bold mb-3 px-1 text-sm text-hint uppercase">Tezkor amallar</h3>
        <div class="grid grid-cols-1 gap-3">
          <button 
            @click="router.push('/b/bookings')"
            class="flex items-center justify-between p-4 bg-secondary-telegram rounded-2xl border border-gray-100"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                <Calendar :size="20" />
              </div>
              <div class="text-left">
                <span class="block font-bold">Navbatlarni boshqarish</span>
                <span class="text-xs text-hint">{{ pendingBookings.length }} ta yangi so‘rov</span>
              </div>
            </div>
            <ChevronRight :size="20" class="text-hint" />
          </button>
          
          <button 
            @click="router.push('/b/services')"
            class="flex items-center justify-between p-4 bg-secondary-telegram rounded-2xl border border-gray-100"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                <Scissors :size="20" />
              </div>
              <div class="text-left">
                <span class="block font-bold">Mening xizmatlarim</span>
                <span class="text-xs text-hint">{{ barberStore.myServices.length }} ta xizmat turi</span>
              </div>
            </div>
            <ChevronRight :size="20" class="text-hint" />
          </button>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div>
        <h3 class="font-bold mb-3 px-1 text-sm text-hint uppercase">So‘nggi navbatlar</h3>
        <div v-if="recentBookings.length === 0" class="p-8 text-center bg-gray-50 rounded-2xl">
          <p class="text-sm text-hint italic">Ma’lumot mavjud emas</p>
        </div>
        <div v-else class="space-y-3">
          <Card v-for="booking in recentBookings" :key="booking.id" class="p-3">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold">
                  {{ booking.clientName[0] }}
                </div>
                <div>
                  <span class="block font-bold">{{ booking.clientName }}</span>
                  <span class="text-xs text-hint">{{ booking.serviceName }}</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-xs font-bold text-link">{{ booking.time }}</span>
                <span class="text-[10px] text-hint">{{ formatDate(booking.date) }}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/booking';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import Card from '@/components/ui/Card.vue';
import { Calendar, Scissors, ChevronRight } from 'lucide-vue-next';

const router = useRouter();
const bookingStore = useBookingStore();
const barberStore = useBarberStore();

const todayIso = new Date().toISOString().split('T')[0];
const todayBookings = computed(() => {
  return bookingStore.bookings.filter(b => b.date === todayIso);
});

const pendingBookings = computed(() => {
  return bookingStore.bookings.filter(b => b.status === 'yangi');
});

const recentBookings = computed(() => {
  return [...bookingStore.bookings].reverse().slice(0, 5);
});

const uniqueClientsCount = computed(() => {
  const clients = new Set(bookingStore.bookings.map(b => b.clientName));
  return clients.size;
});

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
};
</script>
