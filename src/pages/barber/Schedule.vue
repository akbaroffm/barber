<template>
  <div class="pb-24">
    <TopBar title="Ish jadvali" showBack />
    <div class="px-4 pt-2">
      <div class="flex flex-col gap-3">
        <div 
          v-for="(day, key, i) in schedule" 
          :key="key" 
          class="p-4 rounded-[28px] transition-all"
          :style="{ 
            background: 'var(--bg-card)', 
            border: day.active ? '1px solid #c8952e33' : '1px solid #ffffff05',
            opacity: day.active ? 1 : 0.6
          }"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl flex items-center justify-center" :style="{ background: day.active ? 'var(--accent-dim)' : 'var(--bg-elevated)' }">
                <CalendarDays :size="20" :style="{ color: day.active ? 'var(--accent)' : 'var(--text-muted)' }" />
              </div>
              <span class="text-[15px] font-bold">{{ dayLabels[key] }}</span>
            </div>
            
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="day.active" class="sr-only peer" />
              <div class="w-[46px] h-[26px] rounded-full peer peer-checked:after:translate-x-[20px] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm" :style="{ background: day.active ? 'var(--accent)' : '#2a2117' }" />
            </label>
          </div>

          <transition name="expand">
            <div v-if="day.active" class="flex items-center gap-4 mt-4 pt-4" style="border-top: 1px solid #ffffff05;">
              <div class="flex-1 flex flex-col gap-1.5">
                <span class="text-[10px] font-bold uppercase tracking-wider ml-1" style="color: var(--text-muted);">Boshlanish</span>
                <div class="relative">
                  <Clock class="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" :size="14" />
                  <input v-model="day.start" type="time" class="w-full pl-9 py-2.5 rounded-xl text-[14px] font-bold" style="background: var(--bg-primary); border: none;" />
                </div>
              </div>
              <div class="w-6 h-[1px] bg-white/10 mt-5" />
              <div class="flex-1 flex flex-col gap-1.5">
                <span class="text-[10px] font-bold uppercase tracking-wider ml-1" style="color: var(--text-muted);">Tugash</span>
                <div class="relative">
                  <Clock class="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" :size="14" />
                  <input v-model="day.end" type="time" class="w-full pl-9 py-2.5 rounded-xl text-[14px] font-bold" style="background: var(--bg-primary); border: none;" />
                </div>
              </div>
            </div>
            <div v-else class="mt-2 pl-[52px]">
              <span class="text-[12px] font-medium" style="color: var(--text-muted);">Dam olish kuni</span>
            </div>
          </transition>
        </div>
      </div>

      <button @click="saveSchedule" class="w-full py-4 rounded-[20px] text-[15px] font-bold mt-6 shadow-xl flex items-center justify-center gap-2" style="background: var(--accent); color: #000;">
        <Save :size="18" /> Ma'lumotlarni saqlash
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import { CalendarDays, Clock, Save } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const barberStore = useBarberStore();
const schedule = reactive(JSON.parse(JSON.stringify(barberStore.mySchedule)));

const dayLabels = { 
  monday: 'Dushanba', 
  tuesday: 'Seshanba', 
  wednesday: 'Chorshanba', 
  thursday: 'Payshanba', 
  friday: 'Juma', 
  saturday: 'Shanba', 
  sunday: 'Yakshanba' 
};

const saveSchedule = () => { 
  barberStore.updateSchedule({ ...schedule }); 
  telegram.HapticFeedback?.notificationOccurred('success'); 
  telegram.showAlert?.('Ish jadvali muvaffaqiyatli saqlandi'); 
};
</script>

<style scoped>
.expand-enter-active, .expand-leave-active { transition: all 0.3s ease-out; max-height: 100px; opacity: 1; overflow: hidden; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; transform: translateY(-10px); }
</style>
