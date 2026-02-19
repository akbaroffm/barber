<template>
  <div class="min-h-screen flex items-center justify-center p-6" style="background: var(--bg-primary)">
    <div class="max-w-sm w-full text-center">
      <div
        class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style="background: var(--accent-dim)"
      >
        <Check :size="40" style="color: var(--accent)" />
      </div>
      <h1 class="text-2xl font-bold mb-3">Muvaffaqiyatli!</h1>
      <p class="text-[15px] mb-8 leading-relaxed" style="color: var(--text-secondary)">
        Navbat so'rovi muvaffaqiyatli yuborildi. Sartarosh tasdiqlashini kuting.
      </p>
      <div class="flex flex-col gap-3">
        <button
          @click="goToBookings"
          class="w-full py-4 rounded-2xl text-[16px] font-bold shadow-lg active:scale-95 transition-all"
          style="background: var(--accent); color: #000"
        >
          Navbatlarimga o'tish
        </button>
        <button
          @click="goToHome"
          class="w-full py-4 rounded-2xl text-[16px] font-bold active:scale-95 transition-all"
          style="background: var(--bg-card); color: var(--text-primary)"
        >
          Asosiy sahifaga qaytish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Check } from "lucide-vue-next";
import telegram from "@/services/telegram";
import { onMounted } from "vue";

const router = useRouter();

const goToBookings = () => router.push("/c/bookings");
const goToHome = () => router.push("/c/home");

onMounted(() => {
  telegram.BackButton?.hide();
  telegram.HapticFeedback?.notificationOccurred("success");
});
</script>

<style scoped>
/* Page fade-in */
.min-h-screen {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
