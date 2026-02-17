<template>
  <div class="flex flex-col gap-4">
    <TopBar title="Sartaroshlar" />
    
    <div class="px-4 space-y-4">
      <!-- Search Input -->
      <div class="relative">
        <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-hint" />
        <input 
          type="text" 
          placeholder="Sartarosh qidiring..." 
          class="w-full bg-secondary-telegram py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-link/50"
        />
      </div>
      
      <!-- Filters -->
      <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Chip :active="activeFilter === 'all'" @click="activeFilter = 'all'">Hammasi</Chip>
        <Chip :active="activeFilter === 'near'" @click="activeFilter = 'near'">Yaqin</Chip>
        <Chip :active="activeFilter === 'rating'" @click="activeFilter = 'rating'">Reyting</Chip>
        <Chip :active="activeFilter === 'cheap'" @click="activeFilter = 'cheap'">Arzon</Chip>
      </div>
      
      <!-- Barber List -->
      <div class="space-y-4">
        <Card v-for="barber in barbers" :key="barber.id" class="p-3">
          <div class="flex gap-4">
            <img :src="barber.image" class="w-20 h-20 rounded-xl object-cover" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                <h3 class="font-bold truncate">{{ barber.name }}</h3>
                <div class="flex items-center gap-1 text-sm font-medium">
                  <Star :size="14" class="fill-yellow-400 text-yellow-400" />
                  <span>{{ barber.rating }}</span>
                </div>
              </div>
              <p class="text-xs text-hint flex items-center gap-1 mt-1">
                <MapPin :size="12" /> {{ barber.distance }}
              </p>
              <div class="mt-3 flex items-center justify-between">
                <div>
                  <span class="text-xs text-hint block leading-none">Min. narx</span>
                  <span class="font-bold text-link">{{ barber.minPrice.toLocaleString() }} so‘m</span>
                </div>
                <button 
                  @click="router.push(`/c/barber/${barber.id}`)"
                  class="bg-link text-white text-xs px-3 py-2 rounded-lg font-bold"
                >
                  Profilni ko‘rish
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div v-if="barbers.length === 0" class="py-20 text-center">
        <p class="text-hint">Hozircha ma’lumot yo‘q</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import Card from '@/components/ui/Card.vue';
import Chip from '@/components/ui/Chip.vue';
import { Search, Star, MapPin } from 'lucide-vue-next';

const router = useRouter();
const barberStore = useBarberStore();
const activeFilter = ref('all');

const barbers = computed(() => {
  let list = [...barberStore.barbers];
  if (activeFilter.value === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (activeFilter.value === 'cheap') {
    list.sort((a, b) => a.minPrice - b.minPrice);
  }
  return list;
});
</script>
