<template>
  <div class="pb-24">
    <TopBar title="Navbatlar" />

    <!-- Tabs -->
    <div class="flex px-4 gap-1 pt-1 pb-3">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex-1 py-2 rounded-lg text-[13px] font-semibold text-center"
        :style="{
          background: activeTab === tab.id ? 'var(--tg-link)' : 'var(--tg-secondary)',
          color: activeTab === tab.id ? '#fff' : 'var(--tg-hint)'
        }"
      >
        {{ tab.label }}
        <span v-if="tab.count > 0" class="ml-0.5">{{ tab.count }}</span>
      </button>
    </div>

    <div v-if="filtered.length === 0" class="flex flex-col items-center pt-20 text-center">
      <p class="text-[15px]" style="color: var(--tg-hint);">Navbatlar topilmadi</p>
    </div>

    <div v-else class="px-4 flex flex-col gap-2.5">
      <div
        v-for="b in filtered"
        :key="b.id"
        class="p-4 rounded-2xl"
        style="background: var(--tg-secondary);"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold" style="background: var(--tg-bg);">
              {{ b.clientName[0] }}
            </div>
            <div>
              <span class="text-[15px] font-semibold block">{{ b.clientName }}</span>
              <span class="text-[13px]" style="color: var(--tg-hint);">{{ b.serviceName }}</span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-[14px] font-semibold block" style="color: var(--tg-link);">{{ b.time }}</span>
            <span class="text-[12px]" style="color: var(--tg-hint);">{{ formatDate(b.date) }}</span>
          </div>
        </div>

        <!-- Pending actions -->
        <div v-if="b.status === 'yangi'" class="flex gap-2">
          <button
            @click="handleAction(b.id, 'bekor')"
            class="flex-1 py-2.5 rounded-xl text-[14px] font-semibold"
            style="background: #ff3b3010; color: #ff3b30;"
          >
            Rad etish
          </button>
          <button
            @click="handleAction(b.id, 'tasdiqlangan')"
            class="flex-1 py-2.5 rounded-xl text-[14px] font-semibold"
            style="background: #34c75915; color: #34c759;"
          >
            Tasdiqlash
          </button>
        </div>

        <!-- Confirmed action -->
        <button
          v-else-if="b.status === 'tasdiqlangan'"
          @click="handleAction(b.id, 'bajarilgan')"
          class="w-full py-2.5 rounded-xl text-[14px] font-semibold"
          style="background: var(--tg-link); color: #fff;"
        >
          Bajarildi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBookingStore } from '@/stores/booking';
import TopBar from '@/components/shared/TopBar.vue';
import telegram from '@/services/telegram';

const bookingStore = useBookingStore();
const activeTab = ref('yangi');

const tabs = computed(() => [
  { id: 'yangi', label: 'Yangi', count: bookingStore.bookings.filter(b => b.status === 'yangi').length },
  { id: 'tasdiqlangan', label: 'Faol', count: 0 },
  { id: 'bajarilgan', label: 'Tugagan', count: 0 },
  { id: 'bekor', label: 'Bekor', count: 0 }
]);

const filtered = computed(() => bookingStore.bookings.filter(b => b.status === activeTab.value).reverse());

const handleAction = (id, status) => {
  bookingStore.updateBookingStatus(id, status);
  telegram.HapticFeedback?.notificationOccurred(status === 'tasdiqlangan' ? 'success' : 'warning');
};

const formatDate = (d) => new Date(d).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
</script>
