<template>
  <div class="sticky top-0 left-0 right-0 bg-telegram border-b border-gray-100 px-4 py-3 flex items-center justify-between z-40">
    <div class="flex items-center gap-3">
      <button v-if="showBack" @click="goBack" class="p-1 -ml-1">
        <ChevronLeft :size="24" />
      </button>
      <h1 class="text-lg font-semibold truncate">{{ title }}</h1>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ChevronLeft } from 'lucide-vue-next';

const props = defineProps({
  title: String,
  showBack: Boolean
});

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
