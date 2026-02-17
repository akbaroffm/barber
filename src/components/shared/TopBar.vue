<template>
  <header class="sticky top-0 z-40 flex items-center gap-3 px-4 h-11" style="background: var(--tg-bg);">
    <button v-if="showBack" @click="$router.back()" class="flex items-center" style="color: var(--tg-link);">
      <ChevronLeft :size="24" :stroke-width="2.5" />
    </button>
    <h1 class="text-[17px] font-semibold flex-1 truncate">{{ title }}</h1>
    <slot name="right" />
  </header>
</template>

<script setup>
import { ChevronLeft } from 'lucide-vue-next';
defineProps({ title: String, showBack: Boolean });
</script>
