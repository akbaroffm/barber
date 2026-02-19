<template>
  <transition name="sheet">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex flex-col justify-end">
      <!-- Overlay -->
      <div 
        class="absolute inset-0 bg-black/15" 
        @click="$emit('close')" 
      />
      
      <!-- Sheet Content -->
      <div
        class="sheet-content relative rounded-t-3xl pb-8 w-full max-w-[400px] mx-auto overflow-hidden shadow-2xl"
        style="background: var(--bg-card)"
      >
        <div
          class="w-10 h-1.5 rounded-full mx-auto mt-3 mb-5"
          style="background: var(--bg-elevated)"
        />
        <div class="flex justify-between items-center px-6 mb-5">
          <h3 class="text-[18px] font-bold">{{ title }}</h3>
          <button
            @click="$emit('close')"
            class="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 active:scale-90 transition-transform"
          >
            <X :size="20" style="color: var(--text-secondary)" />
          </button>
        </div>
        <div class="px-6"><slot /></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { X } from "lucide-vue-next";
defineProps({ isOpen: Boolean, title: String });
defineEmits(["close"]);
</script>

<style scoped>
/* Overlay fade */
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.22s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

/* Inner content slide-up */
.sheet-enter-active .sheet-content,
.sheet-leave-active .sheet-content {
  transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1);
}
.sheet-enter-from .sheet-content,
.sheet-leave-to .sheet-content {
  transform: translateY(100%);
}
</style>
