<template>
  <div class="pb-24">
    <TopBar title="Boshqaruv paneli" />
    <div class="px-4 pt-2">
      <!-- Welcome Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Salom, Aziz!</h1>
          <p class="text-[13px]" style="color: var(--text-secondary);">Sizda bugun {{ todayCount }} ta uchrashuv bor</p>
        </div>
        <div class="w-12 h-12 rounded-[20px] overflow-hidden border-2 border-[#c8952e33]">
           <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Main Stats Dashboard -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <div class="p-5 rounded-[28px] relative overflow-hidden" style="background: var(--bg-card); border: 1px solid #ffffff05;">
          <div class="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-2xl" style="background: var(--accent-dim);" />
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center mb-3" style="background: var(--accent-dim);">
            <Users :size="20" style="color: var(--accent);" />
          </div>
          <span class="text-2xl font-bold block">{{ totalClients }}</span>
          <span class="text-[11px] font-bold uppercase tracking-wider" style="color: var(--text-secondary);">Jami mijozlar</span>
        </div>
        
        <div @click="$router.push('/b/finance')" class="p-5 rounded-[28px] relative overflow-hidden" style="background: var(--bg-card); border: 1px solid #ffffff05;">
           <div class="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-2xl" style="background: #3b82f620;" />
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center mb-3" style="background: #3b82f620;">
            <TrendingUp :size="20" style="color: #3b82f6;" />
          </div>
          <span class="text-2xl font-bold block">{{ fmt(fin.monthIncome) }}</span>
          <span class="text-[11px] font-bold uppercase tracking-wider" style="color: var(--text-secondary);">Oylik tushum</span>
        </div>
      </div>

      <!-- Action Required Alert -->
      <button v-if="pendingCount > 0" @click="$router.push('/b/bookings')" class="w-full relative overflow-hidden p-5 rounded-[28px] mb-6 flex items-center justify-between" style="background: linear-gradient(135deg, #c8952e 0%, #e0a830 100%);">
        <div class="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-white/10 blur-xl" />
        <div class="flex items-center gap-4 relative z-10">
          <div class="w-12 h-12 rounded-[18px] flex items-center justify-center bg-black/10">
            <BellDot :size="24" class="text-black" />
          </div>
          <div class="text-left">
            <span class="text-[17px] font-bold block text-black">Yangi so'rovlar</span>
            <span class="text-[13px] font-semibold text-black/60">{{ pendingCount }} ta kutilmoqda</span>
          </div>
        </div>
        <div class="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
            <ChevronRight :size="18" class="text-black" />
        </div>
      </button>

      <!-- Main Navigation Modules -->
      <div class="grid grid-cols-2 gap-3 mb-6">
         <button @click="$router.push('/b/bookings')" class="p-4 rounded-[24px] flex flex-col gap-3 text-left" style="background: var(--bg-card);">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background: var(--bg-elevated);">
              <CalendarRange :size="18" style="color: var(--accent);" />
            </div>
            <span class="text-[14px] font-bold">Uchrashuvlar</span>
         </button>
         <button @click="$router.push('/b/services')" class="p-4 rounded-[24px] flex flex-col gap-3 text-left" style="background: var(--bg-card);">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background: var(--bg-elevated);">
              <Scissors :size="18" style="color: var(--accent);" />
            </div>
            <div class="flex justify-between items-end w-full">
              <span class="text-[14px] font-bold">Xizmatlar</span>
              <span class="text-[11px] opacity-40">{{ barberStore.myServices.length }} ta</span>
            </div>
         </button>
         <button @click="$router.push('/b/finance')" class="p-4 rounded-[24px] flex flex-col gap-3 text-left" style="background: var(--bg-card);">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background: var(--bg-elevated);">
              <Wallet :size="18" style="color: var(--accent);" />
            </div>
            <span class="text-[14px] font-bold">Moliya</span>
         </button>
         <button @click="$router.push('/b/schedule')" class="p-4 rounded-[24px] flex flex-col gap-3 text-left" style="background: var(--bg-card);">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background: var(--bg-elevated);">
              <Clock :size="18" style="color: var(--accent);" />
            </div>
            <span class="text-[14px] font-bold">Ish jadvali</span>
         </button>
      </div>

      <!-- Today's Timeline Preview -->
      <div class="flex items-center justify-between mb-4 px-1">
        <h3 class="text-[16px] font-bold">Bugungi navbatlar</h3>
        <button @click="$router.push('/b/bookings')" class="text-[13px] font-bold" style="color: var(--accent);">Bugun</button>
      </div>

      <div v-if="todayBookings.length === 0" class="py-12 text-center rounded-[28px] border-2 border-dashed border-[#ffffff08]" style="background: #1e181050;">
        <CalendarX :size="32" class="mx-auto mb-3 opacity-20" />
        <p class="text-[14px] font-medium" style="color: var(--text-muted);">Hozircha navbatlar yo'q</p>
      </div>

      <div v-else class="flex flex-col gap-2.5">
        <div 
          v-for="b in todayBookings" 
          :key="b.id" 
          class="p-4 rounded-[24px] flex items-center justify-between"
          style="background: var(--bg-card); border: 1px solid #ffffff05;"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center font-bold" style="background: var(--bg-elevated); color: var(--accent);">
              {{ b.clientName[0] }}
            </div>
            <div>
              <span class="text-[14px] font-bold block">{{ b.clientName }}</span>
              <span class="text-[12px] opacity-50">{{ b.serviceName }}</span>
            </div>
          </div>
          <div class="px-3 py-1.5 rounded-xl font-bold text-[13px]" style="background: var(--bg-elevated); color: var(--accent);">
            {{ b.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBookingStore } from '@/stores/booking';
import { useBarberStore } from '@/stores/barber';
import { useFinanceStore } from '@/stores/finance';
import TopBar from '@/components/shared/TopBar.vue';
import { 
  Users, TrendingUp, BellDot, ChevronRight, 
  CalendarRange, Scissors, Wallet, Clock, 
  CalendarX 
} from 'lucide-vue-next';

const bookingStore = useBookingStore();
const barberStore = useBarberStore();
const fin = useFinanceStore();

const todayIso = new Date().toISOString().split('T')[0];
const todayCount = computed(() => bookingStore.bookings.filter(b => b.date === todayIso).length);
const pendingCount = computed(() => bookingStore.bookings.filter(b => b.status === 'yangi').length);
const totalClients = computed(() => new Set(bookingStore.bookings.map(b => b.clientName)).size);
const todayBookings = computed(() => bookingStore.bookings.filter(b => b.date === todayIso).sort((a,b) => a.time.localeCompare(b.time)));

const fmt = (n) => {
  if (!n) return '0';
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toLocaleString();
};
</script>
