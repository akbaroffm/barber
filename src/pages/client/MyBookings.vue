<template>
  <div class="pb-24">
    <TopBar title="Navbatlarim" />

    <div v-if="bookings.length === 0" class="flex flex-col items-center pt-24 text-center px-6">
      <CalendarDays :size="40" style="color: var(--tg-hint); opacity: 0.3;" />
      <p class="text-[15px] mt-4 mb-4" style="color: var(--tg-hint);">Navbatlar hali yo'q</p>
      <button @click="$router.push('/c/home')" class="text-[15px] font-semibold" style="color: var(--tg-link);">
        Sartarosh qidirish
      </button>
    </div>

    <div v-else class="px-4 pt-2 flex flex-col gap-2.5">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="p-4 rounded-2xl"
        style="background: var(--tg-secondary);"
      >
        <div class="flex justify-between items-start mb-2">
          <div>
            <span class="text-[15px] font-semibold block">{{ booking.barberName }}</span>
            <span class="text-[13px]" style="color: var(--tg-hint);">{{ booking.serviceName }}</span>
          </div>
          <span
            class="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md"
            :style="statusStyle[booking.status]"
          >
            {{ statusLabels[booking.status] }}
          </span>
        </div>
        <div class="flex gap-4 text-[13px] font-medium" style="color: var(--tg-link);">
          <span class="flex items-center gap-1"><CalendarDays :size="13" /> {{ formatDate(booking.date) }}</span>
          <span class="flex items-center gap-1"><Clock :size="13" /> {{ booking.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBookingStore } from '@/stores/booking';
import TopBar from '@/components/shared/TopBar.vue';
import { CalendarDays, Clock } from 'lucide-vue-next';

const bookingStore = useBookingStore();
const bookings = computed(() => [...bookingStore.bookings].reverse());

const statusLabels = { yangi: 'Kutilmoqda', tasdiqlangan: 'Tasdiqlangan', bajarilgan: 'Bajarildi', bekor: 'Bekor' };
const statusStyle = {
  yangi: { background: '#ff950015', color: '#ff9500' },
  tasdiqlangan: { background: '#34c75915', color: '#34c759' },
  bajarilgan: { background: '#007aff15', color: '#007aff' },
  bekor: { background: '#ff3b3015', color: '#ff3b30' }
};

const formatDate = (d) => new Date(d).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' });
</script>
