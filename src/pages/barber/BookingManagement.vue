<template>
  <div class="flex flex-col pb-20">
    <TopBar title="Navbatlar boshqaruvi" />
    
    <!-- Tab Navigation -->
    <div class="flex px-4 py-2 border-b border-gray-100 overflow-x-auto scrollbar-none gap-4">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="whitespace-nowrap pb-2 px-1 text-sm font-bold transition-all border-b-2"
        :class="[activeTab === tab.id ? 'text-link border-link' : 'text-hint border-transparent']"
      >
        {{ tab.label }}
        <span v-if="tab.count > 0" class="ml-1 px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px]">
          {{ tab.count }}
        </span>
      </button>
    </div>
    
    <div class="px-4 mt-6">
      <div v-if="filteredBookings.length === 0" class="py-20 text-center">
        <p class="text-hint">Navbatlar topilmadi</p>
      </div>
      
      <div v-else class="space-y-4">
        <Card v-for="booking in filteredBookings" :key="booking.id" class="p-4">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-secondary-telegram rounded-full flex items-center justify-center text-lg font-bold">
                {{ booking.clientName[0] }}
              </div>
              <div>
                <h4 class="font-bold text-lg leading-tight">{{ booking.clientName }}</h4>
                <p class="text-sm text-hint">{{ booking.serviceName }}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="block font-bold text-link">{{ booking.time }}</span>
              <span class="text-xs text-hint">{{ formatDate(booking.date) }}</span>
            </div>
          </div>
          
          <!-- Actions -->
          <div v-if="booking.status === 'yangi'" class="flex gap-3 border-t border-gray-100 pt-4">
            <button 
              @click="handleAction(booking.id, 'bekor')"
              class="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-sm"
            >
              Rad etish
            </button>
            <button 
              @click="handleAction(booking.id, 'tasdiqlangan')"
              class="flex-1 py-3 bg-green-50 text-green-600 rounded-xl font-bold text-sm"
            >
              Tasdiqlash
            </button>
          </div>
          
          <div v-else-if="booking.status === 'tasdiqlangan'" class="flex gap-3 border-t border-gray-100 pt-4">
            <button 
              @click="handleAction(booking.id, 'bajarilgan')"
              class="w-full py-3 bg-link text-white rounded-xl font-bold text-sm"
            >
              Bajarildi deb belgilash
            </button>
          </div>
          
          <div v-else class="pt-2">
            <span 
              class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
              :class="statusColors[booking.status]"
            >
              {{ statusLabels[booking.status] }}
            </span>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBookingStore } from '@/stores/booking';
import TopBar from '@/components/shared/TopBar.vue';
import Card from '@/components/ui/Card.vue';
import telegram from '@/services/telegram';

const bookingStore = useBookingStore();
const activeTab = ref('yangi');

const tabs = computed(() => [
  { id: 'yangi', label: 'Yangi', count: bookingStore.bookings.filter(b => b.status === 'yangi').length },
  { id: 'tasdiqlangan', label: 'Tasdiqlangan', count: 0 },
  { id: 'bajarilgan', label: 'Bajarilgan', count: 0 },
  { id: 'bekor', label: 'Bekor qilingan', count: 0 }
]);

const filteredBookings = computed(() => {
  return bookingStore.bookings.filter(b => b.status === activeTab.value).reverse();
});

const statusLabels = {
  yangi: 'Yangi',
  tasdiqlangan: 'Tasdiqlangan',
  bajarilgan: 'Bajarilgan',
  bekor: 'Rad etildi'
};

const statusColors = {
  bajarilgan: 'bg-blue-100 text-blue-700',
  bekor: 'bg-red-100 text-red-700'
};

const handleAction = (id, status) => {
  const actionText = status === 'tasdiqlangan' ? 'tasdiqlamoqchimisiz' : (status === 'bekor' ? 'rad etmoqchimisiz' : 'bajarildi deb belgilamoqchimisiz');
  
  telegram.showConfirm(`Haqiqatan ham bu buyurtmani ${actionText}?`, (confirmed) => {
    if (confirmed) {
      bookingStore.updateBookingStatus(id, status);
      telegram.HapticFeedback.notificationOccurred(status === 'tasdiqlangan' ? 'success' : 'warning');
    }
  });
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
};
</script>
