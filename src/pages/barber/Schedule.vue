<template>
  <div class="flex flex-col pb-20">
    <TopBar title="Ish jadvali" />
    
    <div class="px-4 mt-4 space-y-4">
      <Card v-for="(day, key) in schedule" :key="key" class="p-4">
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold text-lg capitalize">{{ dayLabels[key] }}</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="day.active" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-link"></div>
          </label>
        </div>
        
        <div v-if="day.active" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] text-hint uppercase font-bold mb-1">Boshlanish</label>
            <input 
              v-model="day.start" 
              type="time" 
              class="w-full bg-secondary-telegram p-3 rounded-xl focus:outline-none font-bold"
            />
          </div>
          <div>
            <label class="block text-[10px] text-hint uppercase font-bold mb-1">Tugash</label>
            <input 
              v-model="day.end" 
              type="time" 
              class="w-full bg-secondary-telegram p-3 rounded-xl focus:outline-none font-bold"
            />
          </div>
        </div>
        <p v-else class="text-sm text-red-500 font-medium italic">Dam olish kuni</p>
      </Card>
      
      <button 
        @click="saveSchedule"
        class="w-full bg-button text-button py-4 rounded-2xl font-bold text-lg shadow-lg"
      >
        Jadvalni saqlash
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import Card from '@/components/ui/Card.vue';
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
  telegram.HapticFeedback.notificationOccurred('success');
  telegram.showAlert('Ish jadvali saqlandi');
};
</script>
