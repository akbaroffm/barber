<template>
  <div class="pb-24">
    <TopBar title="Portfolio va yutuqlar" showBack />
    <div class="px-4 pt-2">
      <!-- Tabs for Portfolio vs Certificates -->
      <div class="flex p-1 rounded-2xl bg-[#1e1810] mb-6" style="border: 1px solid #ffffff05;">
         <button 
           @click="activeTab = 'works'" 
           class="flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all"
           :style="{ background: activeTab === 'works' ? 'var(--accent)' : 'transparent', color: activeTab === 'works' ? '#000' : 'var(--text-secondary)' }"
         >
           Ish namunalari
         </button>
         <button 
           @click="activeTab = 'certs'" 
           class="flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all"
           :style="{ background: activeTab === 'certs' ? 'var(--accent)' : 'transparent', color: activeTab === 'certs' ? '#000' : 'var(--text-secondary)' }"
         >
           Sertifikatlar
         </button>
      </div>

      <!-- Section: Portfolio Works -->
      <div v-if="activeTab === 'works'" class="animate-in fade-in duration-300">
        <div class="flex items-center justify-between mb-4 px-1">
          <h3 class="text-[15px] font-bold">Mening ishlarim</h3>
          <span class="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[#c8952e20]" style="color: var(--accent);">{{ barberStore.myPortfolio.length }} ta</span>
        </div>
        
        <div class="grid grid-cols-3 gap-2.5 mb-8">
          <div 
            v-for="(img, i) in barberStore.myPortfolio" 
            :key="i"
            class="relative aspect-square rounded-[20px] overflow-hidden group border border-[#ffffff05]"
          >
            <img :src="img" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/40 opacity-0 group-active:opacity-100 transition-opacity flex items-center justify-center">
               <Edit2 :size="16" class="text-white" />
            </div>
          </div>
          <button @click="simulateUpload('work')" class="w-full aspect-square rounded-[20px] flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#ffffff08] transition-active active:opacity-50" style="background: #1e181050;">
            <Plus :size="24" style="color: var(--accent)" />
            <span class="text-[9px] font-bold uppercase tracking-wider opacity-40">Qo'shish</span>
          </button>
        </div>
        
        <!-- Achievements removed from here as per user request -->
      </div>

      <!-- Section: Certificates -->
      <div v-if="activeTab === 'certs'" class="animate-in fade-in duration-300">
        <div class="flex items-center justify-between mb-4 px-1">
          <h3 class="text-[15px] font-bold">Sertifikatlar va Diplomlar</h3>
          <button @click="simulateUpload('cert')" class="w-8 h-8 rounded-xl flex items-center justify-center bg-[#c8952e20] transition-active active:scale-90">
             <Plus :size="16" style="color: var(--accent);" />
          </button>
        </div>

        <div v-if="!barberStore.certificates.length" class="py-12 text-center rounded-[28px] border-2 border-dashed border-[#ffffff08]" style="background: #1e181050;">
           <FileText :size="32" class="mx-auto mb-3 opacity-20" />
           <p class="text-[14px] font-medium px-10" style="color: var(--text-muted);">Sizda hali verifikatsiyalangan sertifikatlar yo'q</p>
        </div>

        <div v-else class="flex flex-col gap-4">
           <div 
             v-for="(cert, i) in barberStore.certificates" 
             :key="i"
             class="relative rounded-[28px] overflow-hidden border border-[#ffffff08] group"
             style="background: var(--bg-card);"
           >
              <img :src="cert" class="w-full h-48 object-cover opacity-80" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div class="absolute bottom-4 left-5 right-5 flex justify-between items-end">
                 <div>
                    <span class="text-[11px] font-bold uppercase tracking-widest text-white/50 block mb-1">Diplom #{{ i + 1 }}</span>
                    <span class="text-[16px] font-bold text-white">Professional Barbering</span>
                 </div>
                 <div class="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <CheckCircle :size="18" style="color: var(--accent);" />
                 </div>
              </div>
           </div>
        </div>

        <!-- Verification Badge Info -->
        <div class="mt-8 p-5 rounded-[28px] bg-accent-dim" style="background: #c8952e10; border: 1px solid #c8952e20;">
           <div class="flex items-center gap-3 mb-2">
              <ShieldCheck :size="20" style="color: var(--accent);" />
              <span class="text-[14px] font-bold" style="color: var(--accent);">Verifikatsiya</span>
           </div>
           <p class="text-[12px] leading-relaxed" style="color: var(--text-secondary);">
              Sizning sertifikatlaringiz mijozlar ishonchini oshirish uchun profil sahifangizda maxsus belgi bilan ko'rsatiladi.
           </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import { Plus, Award, Edit2, FileText, CheckCircle, ShieldCheck } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const barberStore = useBarberStore();
const activeTab = ref('works');

const simulateUpload = (type) => {
  telegram.HapticFeedback?.impactOccurred('light');
  
  const performUpload = () => {
    const mockImages = [
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
      'https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=400'
    ];
    const randomImg = mockImages[Math.floor(Math.random() * mockImages.length)];
    
    if (type === 'cert') {
      barberStore.addCertificate(randomImg);
    } else {
      barberStore.myPortfolio.push(randomImg);
    }
    
    telegram.HapticFeedback?.notificationOccurred('success');
    if (telegram.showAlert) {
      telegram.showAlert("Muvaffaqiyatli yuklandi");
    } else {
      alert("Muvaffaqiyatli yuklandi");
    }
  };

  const msg = type === 'cert' ? "Sertifikat yuklamoqchimisiz?" : "Ish namunasini yuklamoqchimisiz?";

  if (telegram.showConfirm) {
    telegram.showConfirm(msg, (ok) => {
      if (ok) {
        telegram.showConfirm("Galereyadan tanlashni xohlaysizmi?", (gal) => {
          if (gal) performUpload();
        });
      }
    });
  } else {
    if (confirm(msg)) performUpload();
  }
};
</script>

<style scoped>
.animate-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
