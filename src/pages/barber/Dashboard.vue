<template>
  <div class="pb-24">
    <TopBar title="Boshqaruv paneli" />

    <div class="px-4 pt-2">
      <!-- Stats -->
      <div class="grid grid-cols-2 gap-2.5 mb-6">
        <div class="p-4 rounded-2xl text-center" style="background: var(--tg-secondary);">
          <span class="text-3xl font-bold block" style="color: var(--tg-link);">{{ todayCount }}</span>
          <span class="text-[12px]" style="color: var(--tg-hint);">Bugungi navbat</span>
        </div>
        <div class="p-4 rounded-2xl text-center" style="background: var(--tg-secondary);">
          <span class="text-3xl font-bold block" style="color: var(--tg-success, #34c759);">{{ totalClients }}</span>
          <span class="text-[12px]" style="color: var(--tg-hint);">Jami mijoz</span>
        </div>
      </div>

      <!-- Pending alert -->
      <button
        v-if="pendingCount > 0"
        @click="$router.push('/b/bookings')"
        class="w-full flex items-center justify-between p-4 rounded-2xl mb-6"
        style="background: #ff950010;"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: #ff950020;">
            <CalendarDays :size="20" style="color: #ff9500;" />
          </div>
          <div class="text-left">
            <span class="text-[15px] font-semibold block">Yangi so'rovlar</span>
            <span class="text-[13px]" style="color: var(--tg-hint);">{{ pendingCount }} ta kutilmoqda</span>
          </div>
        </div>
        <ChevronRight :size="18" style="color: var(--tg-hint);" />
      </button>

      <!-- Quick Links -->
      <div class="rounded-2xl overflow-hidden mb-6" style="background: var(--tg-secondary);">
        <button @click="$router.push('/b/bookings')" class="flex items-center justify-between w-full px-4 py-3.5 text-left" style="border-bottom: 0.5px solid var(--tg-separator);">
          <span class="text-[15px]">Navbatlarni boshqarish</span>
          <ChevronRight :size="18" style="color: var(--tg-hint);" />
        </button>
        <button @click="$router.push('/b/services')" class="flex items-center justify-between w-full px-4 py-3.5 text-left" style="border-bottom: 0.5px solid var(--tg-separator);">
          <span class="text-[15px]">Xizmatlar</span>
          <span class="text-[13px]" style="color: var(--tg-hint);">{{ barberStore.myServices.length }} ta</span>
        </button>
        <button @click="$router.push('/b/schedule')" class="flex items-center justify-between w-full px-4 py-3.5 text-left">
          <span class="text-[15px]">Ish jadvali</span>
          <ChevronRight :size="18" style="color: var(--tg-hint);" />
        </button>
      </div>

      <!-- Recent -->
      <h3 class="text-[13px] font-semibold uppercase mb-2" style="color: var(--tg-hint);">So'nggi navbatlar</h3>
      <div v-if="recent.length === 0" class="py-8 text-center">
        <p class="text-[14px]" style="color: var(--tg-hint);">Ma'lumot yo'q</p>
      </div>
      <div v-else class="rounded-2xl overflow-hidden" style="background: var(--tg-secondary);">
        <div
          v-for="(b, i) in recent"
          :key="b.id"
          class="flex items-center justify-between px-4 py-3.5"
          :style="i < recent.length - 1 ? 'border-bottom: 0.5px solid var(--tg-separator)' : ''"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold" style="background: var(--tg-bg);">
              {{ b.clientName[0] }}
            </div>
            <div>
              <span class="text-[14px] font-medium block">{{ b.clientName }}</span>
              <span class="text-[12px]" style="color: var(--tg-hint);">{{ b.serviceName }}</span>
            </div>
          </div>
          <span class="text-[13px] font-medium" style="color: var(--tg-link);">{{ b.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBookingStore } from '@/stores/booking';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import { CalendarDays, ChevronRight } from 'lucide-vue-next';

const bookingStore = useBookingStore();
const barberStore = useBarberStore();

const todayIso = new Date().toISOString().split('T')[0];
const todayCount = computed(() => bookingStore.bookings.filter(b => b.date === todayIso).length);
const pendingCount = computed(() => bookingStore.bookings.filter(b => b.status === 'yangi').length);
const totalClients = computed(() => new Set(bookingStore.bookings.map(b => b.clientName)).size);
const recent = computed(() => [...bookingStore.bookings].reverse().slice(0, 5));
</script>
