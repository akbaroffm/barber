<template>
  <div class="flex flex-col pb-20">
    <TopBar title="Portfolio va Yutuqlar" showBack />
    
    <div class="px-4 mt-6 space-y-8">
      <!-- Portfolio Section -->
      <div>
        <h3 class="font-bold mb-4 flex items-center gap-2">
          <Image :size="20" class="text-link" />
          Ish namunalari
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="(img, idx) in barberStore.myPortfolio" :key="idx" class="relative group">
            <img :src="img" class="w-full h-40 object-cover rounded-xl shadow-sm" />
            <button class="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full">
              <Trash2 :size="14" />
            </button>
          </div>
          <button class="w-full h-40 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-hint bg-gray-50">
            <Plus :size="24" />
            <span class="text-xs font-bold mt-1">Rasm qo‘shish</span>
          </button>
        </div>
      </div>
      
      <!-- Achievements Section -->
      <div>
        <h3 class="font-bold mb-4 flex items-center gap-2">
          <Award :size="20" class="text-link" />
          Yutuqlar va Sertifikatlar
        </h3>
        <div class="space-y-3">
          <Card v-for="(ach, idx) in barberStore.achievements" :key="idx" class="p-4 flex items-center gap-4">
            <div class="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
              <Trophy :size="24" />
            </div>
            <div>
              <h4 class="font-bold">{{ ach }}</h4>
              <p class="text-xs text-hint">Tasdiqlangan sertifikat</p>
            </div>
          </Card>
          <button class="w-full py-4 bg-secondary-telegram border-2 border-dashed border-gray-200 rounded-2xl font-bold text-sm text-hint">
            Yangi yutuq qo‘shish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import Card from '@/components/ui/Card.vue';
import { Image, Plus, Trash2, Award, Trophy } from 'lucide-vue-next';

const barberStore = useBarberStore();
</script>
