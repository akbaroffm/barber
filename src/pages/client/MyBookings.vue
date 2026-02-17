<template>
  <div class="flex flex-col pb-20">
    <TopBar title="Navbatlarim" />
    
    <div class="px-4 mt-4">
      <div v-if="bookings.length === 0" class="py-20 text-center">
        <div class="mb-4 flex justify-center text-hint">
          <Calendar :size="48" />
        </div>
        <p class="text-hint">Hozircha navbatlar mavjud emas</p>
        <button 
          @click="router.push('/c/home')"
          class="mt-6 text-link font-bold"
        >
          Sartarosh qidirish
        </button>
      </div>
      
      <div v-else class="space-y-4">
        <Card v-for="booking in bookings" :key="booking.id" class="p-4">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h4 class="font-bold text-lg leading-tight">{{ booking.barberName }}</h4>
              <p class="text-sm text-hint">{{ booking.serviceName }}</p>
            </div>
            <div 
              class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              :class="statusColors[booking.status]"
            >
              {{ statusLabels[booking.status] }}
            </div>
          </div>
          
          <div class="flex gap-4 text-sm border-t border-gray-100 pt-3">
            <div class="flex items-center gap-1.5 text-link italic">
              <Calendar :size="14" />
              <span>{{ formatDate(booking.date) }}</span>
            </div>
            <div class="flex items-center gap-1.5 text-link font-bold">
              <Clock :size="14" />
              <span>{{ booking.time }}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/booking';
import TopBar from '@/components/shared/TopBar.vue';
import Card from '@/components/ui/Card.vue';
import { Calendar, Clock } from 'lucide-vue-next';

const router = useRouter();
const bookingStore = useBookingStore();

const bookings = computed(() => {
  return [...bookingStore.bookings].reverse();
});

const statusLabels = {
  yangi: 'Kutilmoqda',
  tasdiqlangan: 'Tasdiqlangan',
  bajarilgan: 'Bajarildi',
  bekor: 'Bekor qilindi'
};

const statusColors = {
  yangi: 'bg-yellow-100 text-yellow-700',
  tasdiqlangan: 'bg-green-100 text-green-700',
  bajarilgan: 'bg-blue-100 text-blue-700',
  bekor: 'bg-red-100 text-red-700'
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' });
};
</script>
