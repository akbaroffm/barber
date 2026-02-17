<template>
  <transition name="slide-up">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex flex-col justify-end">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40" @click="close"></div>
      
      <!-- Content -->
      <div class="relative bg-telegram rounded-t-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div class="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold">{{ title }}</h3>
          <button @click="close" class="p-2 bg-gray-100 rounded-full">
            <X :size="20" />
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { X } from 'lucide-vue-next';

defineProps({
  isOpen: Boolean,
  title: String
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
}
</style>
