<template>
  <div class="pb-24">
    <TopBar title="Portfolio va yutuqlar" showBack />
    <div class="px-4 pt-2">
      <h3 class="text-[13px] font-semibold uppercase mb-3" style="color: var(--text-secondary);">Ish namunalari</h3>
      <div class="grid grid-cols-3 gap-2 mb-6">
        <img v-for="(img, i) in barberStore.myPortfolio" :key="i" :src="img" class="w-full aspect-square object-cover rounded-xl" />
        <button class="w-full aspect-square rounded-xl flex flex-col items-center justify-center" style="background: var(--bg-card);">
          <Plus :size="24" style="color: var(--text-muted);" />
        </button>
      </div>
      <h3 class="text-[13px] font-semibold uppercase mb-3" style="color: var(--text-secondary);">Yutuqlar</h3>
      <div class="rounded-2xl overflow-hidden" style="background: var(--bg-card);">
        <div v-for="(ach, i) in barberStore.achievements" :key="i" class="flex items-center gap-3 px-4 py-3.5" :style="i < barberStore.achievements.length - 1 ? 'border-bottom: 0.5px solid var(--separator)' : ''">
          <Award :size="20" style="color: var(--orange);" />
          <span class="text-[15px] font-medium">{{ ach }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import { Plus, Award } from 'lucide-vue-next';
const barberStore = useBarberStore();
</script>
