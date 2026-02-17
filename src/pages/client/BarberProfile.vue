<template>
  <div v-if="barber" class="pb-28">
    <!-- Hero Image -->
    <div class="relative">
      <img :src="barber.cover" class="w-full h-56 object-cover" />
      <div class="absolute inset-0" style="background: linear-gradient(to top, var(--bg-primary) 0%, transparent 55%);" />
      <div class="absolute top-3 left-3 right-3 flex justify-between">
        <button @click="$router.back()" class="w-9 h-9 rounded-full flex items-center justify-center" style="background: #00000066;">
          <ChevronLeft :size="22" style="color: var(--text-primary);" />
        </button>
        <button class="w-9 h-9 rounded-full flex items-center justify-center" style="background: #00000066;">
          <Heart :size="18" style="color: var(--accent);" />
        </button>
      </div>
      <div class="absolute bottom-14 right-4 px-2 py-0.5 rounded-md text-[11px] font-medium" style="background: #00000088; color: var(--text-primary);">
        <span>{{ currentImg }}/{{ barber.portfolio.length + 1 }}</span>
      </div>
    </div>

    <!-- Info Section -->
    <div class="px-4 -mt-6 relative z-10">
      <h1 class="text-xl font-bold mb-1">{{ barber.name }}</h1>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-[13px] font-semibold" :style="{ color: barber.isOpen ? 'var(--green)' : 'var(--red)' }">
          {{ barber.isOpen ? 'Ochiq' : 'Yopiq' }}
        </span>
        <span class="text-[12px] flex items-center gap-1" style="color: var(--text-secondary);">
          <Clock :size="12" /> {{ barber.workHours }}
        </span>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <span class="flex items-center gap-1 text-[13px] font-medium" style="color: var(--accent);">
          <Star :size="14" style="color: var(--accent);" /> {{ barber.rating }}
          <span style="color: var(--text-secondary);"> ({{ barber.reviewCount }})</span>
        </span>
        <span class="flex items-center gap-1 text-[13px]" style="color: var(--text-secondary);">
          <MapPin :size="13" /> {{ barber.distance }}
        </span>
      </div>

      <!-- Location card (tappable) -->
      <div class="w-full flex items-center gap-3 p-3 rounded-2xl mb-5 text-left" style="background: var(--bg-card);">
        <div @click="openLocation" class="flex flex-1 items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: var(--accent-dim);">
            <MapPin :size="18" style="color: var(--accent);" />
          </div>
          <div class="flex-1 min-w-0">
            <span class="text-[11px] block" style="color: var(--text-secondary);">Manzil</span>
            <span class="text-[14px] font-semibold truncate block" style="color: var(--accent);">{{ barber.address }}</span>
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <a :href="'tel:' + barber.phone.replace(/\s/g, '')" @click.stop="telegram.HapticFeedback?.impactOccurred('light')" class="w-9 h-9 rounded-xl flex items-center justify-center" style="background: var(--bg-elevated);">
            <Phone :size="16" style="color: var(--accent);" />
          </a>
          <div @click.stop="openLocation" class="w-9 h-9 rounded-xl flex items-center justify-center" style="background: var(--accent);">
            <Navigation :size="16" style="color: #000;" />
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-0 mb-4 overflow-x-auto" style="border-bottom: 0.5px solid var(--separator);">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-3 pb-2.5 text-[13px] font-semibold whitespace-nowrap relative"
          :style="{ color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)' }"
        >
          {{ tab.label }}
          <div v-if="activeTab === tab.id" class="absolute bottom-0 left-1 right-1 h-[2px] rounded-full" style="background: var(--accent);" />
        </button>
      </div>

      <!-- Tab: About -->
      <div v-if="activeTab === 'about'">
        <p class="text-[14px] leading-relaxed" style="color: var(--text-secondary);">{{ barber.about }}</p>
      </div>

      <!-- Tab: Services -->
      <div v-if="activeTab === 'services'" class="flex flex-col gap-3">
        <div v-for="service in barber.services" :key="service.id" class="flex gap-3 p-3 rounded-2xl" style="background: var(--bg-card);">
          <img v-if="service.image" :src="service.image" class="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <span class="text-[15px] font-semibold block mb-0.5">{{ service.name }}</span>
            <span class="text-[12px] block mb-1.5 line-clamp-2" style="color: var(--text-secondary);">{{ service.desc || '' }}</span>
            <span class="text-[15px] font-bold" style="color: var(--accent);">{{ service.price.toLocaleString() }} so'm</span>
          </div>
        </div>
      </div>

      <!-- Tab: Gallery -->
      <div v-if="activeTab === 'gallery'" class="grid grid-cols-3 gap-2">
        <img v-for="(img, i) in barber.portfolio" :key="i" :src="img" class="w-full aspect-square object-cover rounded-xl" />
      </div>

      <!-- Tab: Reviews -->
      <div v-if="activeTab === 'reviews'" class="flex flex-col gap-2.5">
        <div v-if="barber.reviews.length === 0" class="py-8 text-center">
          <p class="text-[14px]" style="color: var(--text-secondary);">Hali sharhlar yo'q</p>
        </div>
        <div v-for="review in barber.reviews" :key="review.id" class="flex gap-3 py-3.5" :style="barber.reviews.indexOf(review) < barber.reviews.length - 1 ? 'border-bottom: 0.5px solid var(--separator)' : ''">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0" style="background: var(--bg-elevated); color: var(--accent);">
            {{ review.user[0] }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-[14px] font-semibold">{{ review.user }}</span>
              <div class="flex items-center gap-0.5">
                <Star :size="11" style="color: var(--accent);" />
                <span class="text-[12px] font-medium" style="color: var(--accent);">{{ review.rating }}</span>
              </div>
              <span class="text-[11px]" style="color: var(--text-muted);">· {{ review.date || '' }}</span>
            </div>
            <p class="text-[13px] leading-relaxed" style="color: var(--text-secondary);">{{ review.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="fixed bottom-20 left-4 right-4 z-40">
      <button @click="goToBooking" class="w-full py-3.5 rounded-2xl text-[17px] font-bold" style="background: var(--accent); color: #000;">
        Navbatga yozilish
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBarberStore } from '@/stores/barber';
import { ChevronLeft, Heart, Star, MapPin, Clock, Phone, Navigation } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const route = useRoute();
const router = useRouter();
const barberStore = useBarberStore();

const barber = computed(() => barberStore.barbers.find(b => b.id === route.params.id));
const activeTab = ref('about');
const currentImg = ref(1);

const tabs = [
  { id: 'about', label: "Biz haqimizda" },
  { id: 'services', label: 'Xizmatlar' },
  { id: 'gallery', label: 'Galereya' },
  { id: 'reviews', label: 'Sharhlar' }
];

const openLocation = () => {
  const b = barber.value;
  if (b.location) {
    const url = `https://www.google.com/maps?q=${b.location.lat},${b.location.lng}`;
    window.open(url, '_blank');
  }
  telegram.HapticFeedback?.impactOccurred('light');
};

const goToBooking = () => {
  telegram.HapticFeedback?.impactOccurred('medium');
  router.push(`/c/book/${barber.value.id}`);
};

onMounted(() => {
  telegram.BackButton?.show();
  telegram.BackButton?.onClick(() => router.back());
});

onUnmounted(() => {
  telegram.BackButton?.hide();
});
</script>
