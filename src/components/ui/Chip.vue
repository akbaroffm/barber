<template>
  <button 
    class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
    :class="[active ? 'bg-link text-white' : 'bg-gray-100 text-gray-600']"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  active: Boolean
});
</script>
