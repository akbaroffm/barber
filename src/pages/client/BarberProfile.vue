<template>
  <div v-if="barber" class="flex flex-col pb-6">
    <TopBar :title="barber.name" showBack />
    
    <div class="px-4 mt-4 space-y-6">
      <!-- Info Section -->
      <div class="flex gap-4 items-center">
        <img :src="barber.image" class="w-24 h-24 rounded-2xl object-cover shadow-md" />
        <div>
          <h2 class="text-xl font-bold">{{ barber.name }}</h2>
          <div class="flex items-center gap-1 text-yellow-500 font-bold mb-1">
            <Star :size="16" class="fill-current" />
            <span>{{ barber.rating }}</span>
            <span class="text-hint font-normal text-sm ml-1">({{ barber.reviews.length }} ta baho)</span>
          </div>
          <p class="text-sm text-hint flex items-center gap-1">
            <MapPin :size="14" /> {{ barber.address }}
          </p>
        </div>
      </div>
      
      <!-- Portfolio Gallery -->
      <div>
        <h3 class="font-bold mb-3">Portfolio</h3>
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <img 
            v-for="(img, idx) in barber.portfolio" 
            :key="idx" 
            :src="img" 
            class="w-40 h-52 object-cover rounded-xl shadow-sm" 
          />
        </div>
      </div>
      
      <!-- Services -->
      <div>
        <h3 class="font-bold mb-3">Xizmatlar</h3>
        <div class="space-y-3">
          <div 
            v-for="service in barber.services" 
            :key="service.id" 
            class="bg-secondary-telegram p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <span class="block font-semibold">{{ service.name }}</span>
              <span class="text-xs text-hint">{{ service.duration }} daqiqa</span>
            </div>
            <div class="text-right">
              <span class="block font-bold text-link">{{ service.price.toLocaleString() }} so‘m</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Reviews -->
      <div v-if="barber.reviews.length > 0">
        <h3 class="font-bold mb-3">Mijozlar fikri</h3>
        <div class="space-y-3">
          <div v-for="review in barber.reviews" :key="review.id" class="bg-secondary-telegram p-4 rounded-xl">
            <div class="flex justify-between items-center mb-1">
              <span class="font-bold text-sm">{{ review.user }}</span>
              <div class="flex items-center gap-0.5">
                <Star v-for="i in 5" :key="i" :size="12" :class="[i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300']" />
              </div>
            </div>
            <p class="text-sm">{{ review.text }}</p>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-6 bg-secondary-telegram rounded-xl">
        <p class="text-sm text-hint">Hozircha fikrlar mavjud emas</p>
      </div>
    </div>
    
    <!-- CTA Button -->
    <div class="fixed bottom-24 left-4 right-4 z-40">
      <button 
        @click="goToBooking"
        class="w-full bg-button text-button py-4 rounded-2xl font-bold text-lg shadow-lg"
      >
        Navbatga yozilish
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import { Star, MapPin } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const route = useRoute();
const router = useRouter();
const barberStore = useBarberStore();

const barber = computed(() => {
  return barberStore.barbers.find(b => b.id === route.params.id);
});

const goToBooking = () => {
  telegram.HapticFeedback.impactOccurred('medium');
  router.push(`/c/book/${barber.value.id}`);
};

onMounted(() => {
  telegram.BackButton.show();
  telegram.BackButton.onClick(() => router.back());
});
</script>
