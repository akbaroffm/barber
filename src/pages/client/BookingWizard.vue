<template>
  <div class="pb-28">
    <TopBar :title="step < 5 ? stepTitles[step - 1] : ''" showBack />

    <div class="px-4 pt-2">
      <!-- Progress dots -->
      <div v-if="step < 5" class="flex gap-1.5 mb-6">
        <div
          v-for="i in 4"
          :key="i"
          class="h-1 flex-1 rounded-full transition-all duration-200"
          :style="{ background: i <= step ? 'var(--tg-link)' : 'var(--tg-separator)' }"
        />
      </div>

      <!-- Step 1: Service -->
      <div v-if="step === 1" class="rounded-2xl overflow-hidden" style="background: var(--tg-secondary);">
        <button
          v-for="(service, i) in barber.services"
          :key="service.id"
          @click="selectService(service)"
          class="flex justify-between items-center w-full px-4 py-3.5 text-left"
          :style="[
            i < barber.services.length - 1 ? `border-bottom: 0.5px solid var(--tg-separator)` : '',
            selectedService?.id === service.id ? `background: color-mix(in srgb, var(--tg-link) 8%, transparent)` : ''
          ]"
        >
          <div>
            <span class="text-[15px] font-medium block">{{ service.name }}</span>
            <span class="text-[13px]" style="color: var(--tg-hint);">{{ service.duration }} daqiqa</span>
          </div>
          <div class="flex items-center gap-2.5">
            <span class="text-[15px] font-semibold" style="color: var(--tg-link);">{{ service.price.toLocaleString() }}</span>
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
              :style="{ borderColor: selectedService?.id === service.id ? 'var(--tg-link)' : 'var(--tg-separator)' }"
            >
              <div v-if="selectedService?.id === service.id" class="w-2.5 h-2.5 rounded-full" style="background: var(--tg-link);"/>
            </div>
          </div>
        </button>
      </div>

      <!-- Step 2: Date -->
      <div v-if="step === 2" class="grid grid-cols-4 gap-2">
        <button
          v-for="date in availableDates"
          :key="date.iso"
          @click="selectDate(date)"
          class="py-3 rounded-xl text-center"
          :style="{
            background: selectedDate?.iso === date.iso ? 'var(--tg-link)' : 'var(--tg-secondary)',
            color: selectedDate?.iso === date.iso ? '#fff' : 'var(--tg-text)'
          }"
        >
          <span class="block text-[11px] uppercase font-medium" :style="{ opacity: selectedDate?.iso === date.iso ? 1 : 0.5 }">{{ date.weekday }}</span>
          <span class="block text-xl font-bold">{{ date.day }}</span>
          <span class="block text-[11px]" :style="{ opacity: selectedDate?.iso === date.iso ? 1 : 0.5 }">{{ date.month }}</span>
        </button>
      </div>

      <!-- Step 3: Time -->
      <div v-if="step === 3" class="grid grid-cols-3 gap-2">
        <button
          v-for="time in timeSlots"
          :key="time"
          @click="selectedTime = time"
          class="py-3 rounded-xl text-center text-[15px] font-semibold"
          :style="{
            background: selectedTime === time ? 'var(--tg-link)' : 'var(--tg-secondary)',
            color: selectedTime === time ? '#fff' : 'var(--tg-text)'
          }"
        >
          {{ time }}
        </button>
      </div>

      <!-- Step 4: Confirm -->
      <div v-if="step === 4">
        <div class="rounded-2xl overflow-hidden" style="background: var(--tg-secondary);">
          <div class="flex items-center gap-3.5 p-4" style="border-bottom: 0.5px solid var(--tg-separator);">
            <img :src="barber.image" class="w-12 h-12 rounded-xl object-cover" />
            <div>
              <span class="block text-[15px] font-semibold">{{ barber.name }}</span>
              <span class="text-[13px]" style="color: var(--tg-hint);">{{ barber.address }}</span>
            </div>
          </div>
          <div class="px-4">
            <div class="flex justify-between py-3" style="border-bottom: 0.5px solid var(--tg-separator);">
              <span class="text-[14px]" style="color: var(--tg-hint);">Xizmat</span>
              <span class="text-[14px] font-medium">{{ selectedService.name }}</span>
            </div>
            <div class="flex justify-between py-3" style="border-bottom: 0.5px solid var(--tg-separator);">
              <span class="text-[14px]" style="color: var(--tg-hint);">Sana</span>
              <span class="text-[14px] font-medium">{{ selectedDate.day }} {{ selectedDate.monthFull }}</span>
            </div>
            <div class="flex justify-between py-3" style="border-bottom: 0.5px solid var(--tg-separator);">
              <span class="text-[14px]" style="color: var(--tg-hint);">Vaqt</span>
              <span class="text-[14px] font-medium">{{ selectedTime }}</span>
            </div>
            <div class="flex justify-between py-3">
              <span class="text-[14px] font-semibold">Jami</span>
              <span class="text-[15px] font-bold" style="color: var(--tg-link);">{{ selectedService.price.toLocaleString() }} so'm</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 5: Success -->
      <div v-if="step === 5" class="flex flex-col items-center pt-16 text-center">
        <div class="w-16 h-16 rounded-full flex items-center justify-center mb-5" style="background: #34c75920;">
          <Check :size="32" style="color: var(--tg-success, #34c759);" />
        </div>
        <h2 class="text-xl font-bold mb-2">Muvaffaqiyatli!</h2>
        <p class="text-[15px] mb-8" style="color: var(--tg-hint);">
          So'rov yuborildi. Sartarosh tasdiqlashini kuting.
        </p>
        <button
          @click="$router.push('/c/bookings')"
          class="px-8 py-3 rounded-xl text-[15px] font-semibold"
          style="background: var(--tg-btn); color: var(--tg-btn-text);"
        >
          Navbatlarimga o'tish
        </button>
      </div>
    </div>

    <!-- Bottom button -->
    <div v-if="step < 5" class="fixed bottom-20 left-4 right-4 z-40">
      <button
        @click="nextStep"
        :disabled="!canContinue"
        class="w-full py-3.5 rounded-xl text-[17px] font-semibold transition-opacity"
        :style="{
          background: 'var(--tg-btn)',
          color: 'var(--tg-btn-text)',
          opacity: canContinue ? 1 : 0.4
        }"
      >
        {{ step === 4 ? 'Tasdiqlash' : 'Davom etish' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
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

const barber = computed(() => barberStore.barbers.find(b => b.id === route.params.id));
const step = ref(1);
const stepTitles = ['Xizmat tanlang', 'Sana tanlang', 'Vaqt tanlang', 'Tasdiqlash'];

const selectedService = ref(null);
const selectedDate = ref(null);
const selectedTime = ref(null);

const months = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avg','Sen','Okt','Noy','Dek'];
const weekdays = ['Yak','Dush','Sesh','Chor','Pay','Jum','Shan'];

const availableDates = computed(() => {
  const dates = [];
  for (let i = 0; i < 8; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    dates.push({
      iso: d.toISOString().split('T')[0],
      day: d.getDate(),
      month: months[d.getMonth()].slice(0,3),
      monthFull: months[d.getMonth()],
      weekday: weekdays[d.getDay()]
    });
  }
  return dates;
});

const timeSlots = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];

const selectService = (s) => { selectedService.value = s; telegram.HapticFeedback?.selectionChanged(); };
const selectDate = (d) => { selectedDate.value = d; telegram.HapticFeedback?.selectionChanged(); };

const canContinue = computed(() => {
  if (step.value === 1) return !!selectedService.value;
  if (step.value === 2) return !!selectedDate.value;
  if (step.value === 3) return !!selectedTime.value;
  return true;
});

const nextStep = () => {
  if (!canContinue.value) return;
  if (step.value < 4) {
    step.value++;
    telegram.HapticFeedback?.impactOccurred('light');
  } else {
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
    telegram.HapticFeedback?.notificationOccurred('success');
    step.value = 5;
  }
};

onMounted(() => {
  telegram.BackButton?.show();
  telegram.BackButton?.onClick(() => { step.value > 1 && step.value < 5 ? step.value-- : router.back(); });
});
onUnmounted(() => { telegram.BackButton?.hide(); });
</script>
