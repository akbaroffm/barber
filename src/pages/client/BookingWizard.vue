<template>
  <div class="flex flex-col min-h-screen pb-32">
    <TopBar :title="`Navbatga yozilish: ${stepTitles[step - 1]}`" showBack />
    
    <div class="px-4 mt-6">
      <!-- Step 1: Service Selection -->
      <div v-if="step === 1" class="space-y-4">
        <h3 class="text-lg font-bold mb-4">Xizmatni tanlang:</h3>
        <div 
          v-for="service in barber.services" 
          :key="service.id"
          @click="selectService(service)"
          class="p-4 rounded-2xl border-2 transition-all flex justify-between items-center"
          :class="[selectedService?.id === service.id ? 'border-link bg-link/5' : 'border-gray-100 bg-secondary-telegram']"
        >
          <div>
            <span class="block font-bold">{{ service.name }}</span>
            <span class="text-xs text-hint">{{ service.duration }} daqiqa</span>
          </div>
          <span class="font-bold text-link">{{ service.price.toLocaleString() }} so‘m</span>
        </div>
      </div>
      
      <!-- Step 2: Date Selection -->
      <div v-if="step === 2" class="space-y-6">
        <h3 class="text-lg font-bold mb-4">Sanani tanlang:</h3>
        <div class="grid grid-cols-4 gap-3">
          <button 
            v-for="date in availableDates" 
            :key="date.iso"
            @click="selectDate(date)"
            class="p-3 rounded-xl border-2 text-center transition-all"
            :class="[selectedDate?.iso === date.iso ? 'border-link bg-link/5' : 'border-gray-100 bg-secondary-telegram']"
          >
            <span class="block text-xs text-hint uppercase">{{ date.weekday }}</span>
            <span class="block text-xl font-bold">{{ date.day }}</span>
            <span class="block text-[10px]">{{ date.month }}</span>
          </button>
        </div>
      </div>
      
      <!-- Step 3: Time Selection -->
      <div v-if="step === 3" class="space-y-6">
        <h3 class="text-lg font-bold mb-4">Bo‘sh vaqtni tanlang:</h3>
        <div class="grid grid-cols-3 gap-3">
          <button 
            v-for="time in timeSlots" 
            :key="time"
            @click="selectedTime = time"
            class="p-3 rounded-xl border-2 text-center font-bold transition-all"
            :class="[selectedTime === time ? 'border-link bg-link/5' : 'border-gray-100 bg-secondary-telegram']"
          >
            {{ time }}
          </button>
        </div>
      </div>
      
      <!-- Step 4: Confirmation -->
      <div v-if="step === 4" class="space-y-8">
        <div class="bg-secondary-telegram p-6 rounded-3xl border-2 border-link/20">
          <div class="flex items-center gap-4 mb-6">
            <img :src="barber.image" class="w-16 h-16 rounded-xl object-cover" />
            <div>
              <h4 class="font-bold text-lg">{{ barber.name }}</h4>
              <p class="text-sm text-hint">{{ barber.address }}</p>
            </div>
          </div>
          
          <div class="space-y-4 border-t border-gray-200 pt-4">
            <div class="flex justify-between">
              <span class="text-hint">Xizmat:</span>
              <span class="font-bold">{{ selectedService.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-hint">Sana:</span>
              <span class="font-bold">{{ selectedDate.day }} {{ selectedDate.monthFull }}, {{ selectedDate.weekdayFull }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-hint">Vaqt:</span>
              <span class="font-bold">{{ selectedTime }}</span>
            </div>
            <div class="flex justify-between pt-4 border-t border-dashed border-gray-300">
              <span class="font-bold">Jami:</span>
              <span class="font-extrabold text-xl text-link">{{ selectedService.price.toLocaleString() }} so‘m</span>
            </div>
          </div>
        </div>
        
        <div class="text-center p-4 bg-blue-50 text-blue-700 rounded-xl text-sm">
          So‘rov yuborilgandan so‘ng, sartarosh uni tasdiqlashi kutiladi.
        </div>
      </div>
      
      <!-- Success View -->
      <div v-if="step === 5" class="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
        <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <Check :size="48" />
        </div>
        <h2 class="text-2xl font-bold mb-4">Muvaffaqiyatli!</h2>
        <p class="text-hint mb-8 px-6">
          So‘rov yuborildi. Sartarosh tasdiqlashini kuting.
        </p>
        <button 
          @click="router.push('/c/bookings')"
          class="bg-button text-button px-8 py-3 rounded-xl font-bold"
        >
          Navbatlarimga o‘tish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBarberStore } from '@/stores/barber';
import { useBookingStore } from '@/stores/booking';
import TopBar from '@/components/shared/TopBar.vue';
import { Check } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const route = useRoute();
const router = useRouter();
const barberStore = useBarberStore();
const bookingStore = useBookingStore();

const barber = computed(() => {
  return barberStore.barbers.find(b => b.id === route.params.id);
});

const step = ref(1);
const stepTitles = ['Xizmat', 'Sana', 'Vaqt', 'Tasdiqlash'];

const selectedService = ref(null);
const selectedDate = ref(null);
const selectedTime = ref(null);

const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
const weekdays = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
const weekdaysFull = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

const availableDates = computed(() => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    dates.push({
      iso: d.toISOString().split('T')[0],
      day: d.getDate(),
      month: months[d.getMonth()].slice(0, 3),
      monthFull: months[d.getMonth()],
      weekday: weekdays[d.getDay()],
      weekdayFull: weekdaysFull[d.getDay()]
    });
  }
  return dates;
});

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

const selectService = (service) => {
  selectedService.value = service;
  telegram.HapticFeedback.impactOccurred('light');
};

const selectDate = (date) => {
  selectedDate.value = date;
  telegram.HapticFeedback.impactOccurred('light');
};

const handleMainButtonClick = () => {
  if (step.value < 4) {
    step.value++;
    telegram.HapticFeedback.impactOccurred('medium');
  } else if (step.value === 4) {
    // Finish booking
    bookingStore.addBooking({
      barberId: barber.value.id,
      barberName: barber.value.name,
      serviceId: selectedService.value.id,
      serviceName: selectedService.value.name,
      date: selectedDate.value.iso,
      time: selectedTime.value,
      price: selectedService.value.price,
      clientName: telegram.user.first_name || 'Mijoz'
    });
    
    telegram.HapticFeedback.notificationOccurred('success');
    step.value = 5;
    telegram.MainButton.hide();
  }
};

const updateMainButton = () => {
  if (step.value >= 5) {
    telegram.MainButton.hide();
    return;
  }

  telegram.MainButton.setParams({
    text: step.value === 4 ? 'Tasdiqlash' : 'Davom etish',
    isVisible: true,
    is_active: false
  });

  const canContinue = 
    (step.value === 1 && selectedService.value) ||
    (step.value === 2 && selectedDate.value) ||
    (step.value === 3 && selectedTime.value) ||
    (step.value === 4);

  if (canContinue) {
    telegram.MainButton.enable();
  } else {
    telegram.MainButton.disable();
  }
};

watch([step, selectedService, selectedDate, selectedTime], updateMainButton);

onMounted(() => {
  telegram.MainButton.show();
  telegram.MainButton.onClick(handleMainButtonClick);
  updateMainButton();
  
  telegram.BackButton.show();
  telegram.BackButton.onClick(() => {
    if (step.value > 1 && step.value < 5) {
      step.value--;
    } else {
      router.back();
    }
  });
});

onUnmounted(() => {
  telegram.MainButton.hide();
  telegram.MainButton.offClick(handleMainButtonClick);
});
</script>
