<template>
  <div class="pb-24">
    <TopBar title="Ish jadvali" showBack />

    <div class="px-4 pt-2">
      <div class="rounded-2xl overflow-hidden" style="background: var(--tg-secondary);">
        <div
          v-for="(day, key, i) in schedule"
          :key="key"
          class="px-4 py-3.5"
          :style="i < Object.keys(schedule).length - 1 ? 'border-bottom: 0.5px solid var(--tg-separator)' : ''"
        >
          <div class="flex justify-between items-center">
            <span class="text-[15px] font-medium">{{ dayLabels[key] }}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="day.active" class="sr-only peer" />
              <div class="w-[44px] h-[26px] rounded-full peer peer-checked:after:translate-x-[18px] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                :style="{ background: day.active ? 'var(--tg-link)' : '#e0e0e0' }"
              />
            </label>
          </div>
          <div v-if="day.active" class="flex gap-3 mt-3">
            <input v-model="day.start" type="time" class="flex-1 text-center text-[14px] font-medium py-2" />
            <input v-model="day.end" type="time" class="flex-1 text-center text-[14px] font-medium py-2" />
          </div>
          <span v-else class="text-[13px] mt-1 block" style="color: var(--tg-hint);">Dam olish kuni</span>
        </div>
      </div>

      <button
        @click="saveSchedule"
        class="w-full py-3.5 rounded-xl text-[15px] font-semibold mt-4"
        style="background: var(--tg-btn); color: var(--tg-btn-text);"
      >
        Saqlash
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import telegram from '@/services/telegram';

const barberStore = useBarberStore();
const schedule = reactive(JSON.parse(JSON.stringify(barberStore.mySchedule)));

const dayLabels = {
  monday: 'Dushanba', tuesday: 'Seshanba', wednesday: 'Chorshanba',
  thursday: 'Payshanba', friday: 'Juma', saturday: 'Shanba', sunday: 'Yakshanba'
};

const saveSchedule = () => {
  barberStore.updateSchedule({ ...schedule });
  telegram.HapticFeedback?.notificationOccurred('success');
  telegram.showAlert?.('Jadval saqlandi');
};
</script>
