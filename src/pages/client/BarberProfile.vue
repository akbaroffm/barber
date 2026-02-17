<template>
  <div v-if="barber" class="pb-28">
    <TopBar :title="barber.name" showBack />

    <div class="px-4 pt-2">
      <!-- Header -->
      <div class="flex gap-4 mb-6">
        <img :src="barber.image" class="w-20 h-20 rounded-2xl object-cover shrink-0" />
        <div>
          <h2 class="text-xl font-bold mb-0.5">{{ barber.name }}</h2>
          <div class="flex items-center gap-1 text-[14px] font-medium mb-1">
            <Star :size="14" class="fill-amber-400 text-amber-400" />
            {{ barber.rating }}
            <span class="font-normal" style="color: var(--tg-hint);">· {{ barber.reviews.length }} ta baho</span>
          </div>
          <p class="text-[13px] flex items-center gap-1" style="color: var(--tg-hint);">
            <MapPin :size="13" /> {{ barber.address }}
          </p>
        </div>
      </div>

      <!-- Portfolio -->
      <div v-if="barber.portfolio.length" class="mb-6">
        <h3 class="text-[15px] font-semibold mb-3">Portfolio</h3>
        <div class="flex gap-2.5 overflow-x-auto">
          <img
            v-for="(img, i) in barber.portfolio"
            :key="i"
            :src="img"
            class="w-32 h-44 rounded-xl object-cover shrink-0"
          />
        </div>
      </div>

      <!-- Services -->
      <div class="mb-6">
        <h3 class="text-[15px] font-semibold mb-3">Xizmatlar</h3>
        <div class="rounded-2xl overflow-hidden" style="background: var(--tg-secondary);">
          <div
            v-for="(service, i) in barber.services"
            :key="service.id"
            class="flex justify-between items-center px-4 py-3.5"
            :style="i < barber.services.length - 1 ? `border-bottom: 0.5px solid var(--tg-separator)` : ''"
          >
            <div>
              <span class="text-[15px] font-medium block">{{ service.name }}</span>
              <span class="text-[13px]" style="color: var(--tg-hint);">{{ service.duration }} daqiqa</span>
            </div>
            <span class="text-[15px] font-semibold" style="color: var(--tg-link);">
              {{ service.price.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div v-if="barber.reviews.length" class="mb-6">
        <h3 class="text-[15px] font-semibold mb-3">Sharhlar</h3>
        <div class="flex flex-col gap-2.5">
          <div
            v-for="review in barber.reviews"
            :key="review.id"
            class="p-3.5 rounded-2xl"
            style="background: var(--tg-secondary);"
          >
            <div class="flex justify-between items-center mb-1">
              <span class="text-[14px] font-semibold">{{ review.user }}</span>
              <div class="flex gap-0.5">
                <Star v-for="j in 5" :key="j" :size="12" :class="j <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'" />
              </div>
            </div>
            <p class="text-[14px]" style="color: var(--tg-hint);">{{ review.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="fixed bottom-20 left-4 right-4 z-40">
      <button
        @click="goToBooking"
        class="w-full py-3.5 rounded-xl text-[17px] font-semibold"
        style="background: var(--tg-btn); color: var(--tg-btn-text);"
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

const barber = computed(() => barberStore.barbers.find(b => b.id === route.params.id));

const goToBooking = () => {
  telegram.HapticFeedback?.impactOccurred('medium');
  router.push(`/c/book/${barber.value.id}`);
};

onMounted(() => {
  telegram.BackButton?.show();
  telegram.BackButton?.onClick(() => router.back());
});
</script>
