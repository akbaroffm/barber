<template>
  <div class="pb-24">
    <TopBar title="Tanlanganlar" />
    
    <div v-if="favoriteBarbers.length === 0" class="flex flex-col items-center justify-center pt-20 px-6 text-center">
      <div class="w-20 h-20 rounded-full flex items-center justify-center mb-4" style="background: var(--bg-card);">
        <Heart :size="32" style="color: var(--text-muted);" />
      </div>
      <h3 class="text-[17px] font-bold mb-2">Hali tanlanganlar yo'q</h3>
      <p class="text-[14px] mb-6" style="color: var(--text-secondary);">
        Siz yoqtirgan sartaroshlarni saqlab qo'yish uchun yurak belgisini bosing
      </p>
      <button @click="$router.push('/c/home')" class="px-6 py-3 rounded-full text-[15px] font-semibold" style="background: var(--accent); color: #000;">
        Sartarosh qidirish
      </button>
    </div>

    <div v-else class="px-4 pt-4">
      <div class="flex justify-between items-center mb-3">
        <span class="text-[14px]" style="color: var(--text-secondary);">{{ favoriteBarbers.length }} ta tanlangan</span>
        <button v-if="favoriteBarbers.length > 0" @click="clearAll" class="text-[13px] font-semibold" style="color: var(--red);">Hammasini o'chirish</button>
      </div>

      <div class="flex flex-col gap-3">
        <button
          v-for="barber in favoriteBarbers"
          :key="barber.id"
          @click="$router.push(`/c/barber/${barber.id}`)"
          class="flex gap-3 p-3 rounded-2xl text-left relative"
          style="background: var(--bg-card);"
        >
          <img :src="barber.image" class="w-20 h-20 rounded-xl object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <span class="text-[15px] font-semibold block mb-0.5 truncate">{{ barber.name }}</span>
            <div class="flex items-center gap-2 mb-1">
              <span class="flex items-center gap-0.5 text-[12px] font-medium" style="color: var(--accent);">
                <Star :size="12" style="color: var(--accent);" /> {{ barber.rating }}
              </span>
              <span class="text-[12px] flex items-center gap-0.5" style="color: var(--text-secondary);">
                <MapPin :size="12" /> {{ barber.distance }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[12px] font-medium" :style="{ color: barber.isOpen ? 'var(--green)' : 'var(--red)' }">
                {{ barber.isOpen ? 'Ochiq' : 'Yopiq' }}
              </span>
              <span class="text-[11px] flex items-center gap-0.5" style="color: var(--text-muted);">
                <Clock :size="10" /> {{ barber.workHours }}
              </span>
            </div>
          </div>
          <button @click.stop="removeFavorite(barber.id)" class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style="background: var(--bg-elevated);">
            <Heart :size="16" fill="var(--accent)" style="color: var(--accent);" />
          </button>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFavoritesStore } from '@/stores/favorites';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import { Heart, Star, MapPin, Clock } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const router = useRouter();
const favoritesStore = useFavoritesStore();
const barberStore = useBarberStore();

const favoriteBarbers = computed(() => {
  return favoritesStore.favorites
    .map(id => barberStore.barbers.find(b => b.id === id))
    .filter(Boolean); // Remove any undefined entries
});

const removeFavorite = (barberId) => {
  favoritesStore.removeFavorite(barberId);
  telegram.HapticFeedback?.impactOccurred('light');
};

const clearAll = () => {
  const perform = () => {
    favoritesStore.clearAllFavorites();
    telegram.HapticFeedback?.notificationOccurred('success');
  };
  
  if (telegram.showConfirm) {
    telegram.showConfirm("Barcha tanlanganlarni o'chirmoqchimisiz?", (ok) => {
      if (ok) perform();
    });
  } else {
    if (confirm("Barcha tanlanganlarni o'chirmoqchimisiz?")) perform();
  }
};
</script>
