<template>
  <transition name="sheet">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex flex-col justify-end">
      <div class="absolute inset-0 bg-black/50" @click="$emit('close')" />
      <div class="relative rounded-t-2xl pb-8" style="background: var(--bg-card);">
        <div class="w-9 h-1 rounded-full mx-auto mt-3 mb-4" style="background: var(--separator);" />
        <div class="flex justify-between items-center px-5 mb-5">
          <h3 class="text-[17px] font-semibold">{{ title }}</h3>
          <button @click="$emit('close')" class="text-[15px] font-medium" style="color: var(--accent);">Yopish</button>
        </div>
        <div class="px-5"><slot /></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({ isOpen: Boolean, title: String });
defineEmits(['close']);
</script>

<style scoped>
.sheet-enter-active, .sheet-leave-active { transition: opacity 0.2s ease; }
.sheet-enter-from, .sheet-leave-to { opacity: 0; }
</style>
