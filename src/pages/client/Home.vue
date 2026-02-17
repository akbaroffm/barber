<template>
  <div class="pb-24">
    <TopBar title="Sartaroshlar" />

    <!-- Search -->
    <div class="px-4 pt-2 pb-3">
      <div class="relative">
        <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2" style="color: var(--tg-hint);" />
        <input
          v-model="search"
          type="text"
          placeholder="Sartarosh qidiring..."
          class="pl-10 pr-4"
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 px-4 pb-4 overflow-x-auto">
      <button
        v-for="f in filters"
        :key="f.id"
        @click="activeFilter = f.id"
        class="px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap"
        :style="{
          background: activeFilter === f.id ? 'var(--tg-link)' : 'var(--tg-secondary)',
          color: activeFilter === f.id ? '#fff' : 'var(--tg-text)'
        }"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Barber List -->
    <div class="px-4 flex flex-col gap-3">
      <button
        v-for="barber in filteredBarbers"
        :key="barber.id"
        @click="$router.push(`/c/barber/${barber.id}`)"
        class="flex gap-3.5 p-3 rounded-2xl text-left"
        style="background: var(--tg-secondary);"
      >
        <img :src="barber.image" class="w-16 h-16 rounded-xl object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-0.5">
            <span class="font-semibold text-[15px] truncate">{{ barber.name }}</span>
            <span class="flex items-center gap-0.5 text-[13px] font-medium shrink-0">
              <Star :size="13" class="fill-amber-400 text-amber-400" />
              {{ barber.rating }}
            </span>
          </div>
          <span class="flex items-center gap-1 text-[13px] mb-1.5" style="color: var(--tg-hint);">
            <MapPin :size="12" /> {{ barber.distance }}
          </span>
          <span class="text-[13px] font-semibold" style="color: var(--tg-link);">
            {{ barber.minPrice.toLocaleString() }} so'm dan
          </span>
        </div>
      </button>

      <div v-if="filteredBarbers.length === 0" class="py-16 text-center">
        <p class="text-[15px]" style="color: var(--tg-hint);">Hozircha ma'lumot yo'q</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import { Search, Star, MapPin } from 'lucide-vue-next';

const barberStore = useBarberStore();
const search = ref('');
const activeFilter = ref('all');

const filters = [
  { id: 'all', label: 'Hammasi' },
  { id: 'near', label: 'Yaqin' },
  { id: 'rating', label: 'Reyting' },
  { id: 'cheap', label: 'Arzon' }
];

const filteredBarbers = computed(() => {
  let list = [...barberStore.barbers];
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(b => b.name.toLowerCase().includes(q));
  }
  if (activeFilter.value === 'rating') list.sort((a, b) => b.rating - a.rating);
  if (activeFilter.value === 'cheap') list.sort((a, b) => a.minPrice - b.minPrice);
  return list;
});
</script>
