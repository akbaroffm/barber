<template>
  <div class="min-h-screen pb-10" style="background: var(--bg-primary)">
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/50"
    >
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center"
          style="background: var(--accent)"
        >
          <Scissors :size="18" class="text-black" />
        </div>
        <span class="font-bold text-lg">Barber</span>
      </div>
      <router-link
        to="/login"
        class="text-[14px] font-medium"
        style="
          color: #fff;
          border: 1px solid var(--accent);
          padding: 6px 16px;
          border-radius: 9999px;
          background-color: var(--accent);
        "
        >Kirish</router-link
      >
    </header>

    <!-- Hero Section -->
    <section class="pt-24 px-6 pb-12 text-center relative overflow-hidden">
      <div
        class="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20"
        style="background: var(--accent)"
      />

      <div class="relative z-10">
        <span
          class="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4 border"
          style="
            background: var(--bg-card);
            border-color: var(--accent-dim);
            color: var(--accent);
          "
        >
          Zamonaviy yechim
        </span>
        <h1 class="text-3xl font-bold mb-4 leading-tight">
          Sartaroshxona xizmatlari
          <span style="color: var(--accent)">endi oson</span>
        </h1>
        <p
          class="text-[15px] mb-8 leading-relaxed opacity-70"
          style="color: var(--text-secondary)"
        >
          Mijozlar uchun qulay navbat, sartaroshlar uchun mukammal boshqaruv
          tizimi.
        </p>

        <button
          @click="handleStart"
          class="w-full py-3 rounded-2xl text-[16px] font-bold block shadow-lg active:scale-95 transition-transform"
          style="
            background: var(--accent);
            color: #000;
            box-shadow: 0 10px 30px rgba(200, 149, 46, 0.3);
          "
        >
          {{ authStore.isAuthenticated ? "Kabinetga o'tish" : "Boshlash" }}
        </button>
      </div>
    </section>

    <!-- For Clients -->
    <section class="px-6 mb-12">
      <div class="flex items-center gap-3 mb-6">
        <div class="h-[1px] flex-1 bg-white/10" />
        <span class="text-[12px] font-bold uppercase tracking-widest opacity-50"
          >Mijozlar uchun</span
        >
        <div class="h-[1px] flex-1 bg-white/10" />
      </div>

      <!-- Client Features Slider -->
      <div
        class="relative p-6 rounded-[32px] overflow-hidden min-h-[220px] flex flex-col items-center justify-center text-center transition-all duration-500"
        style="background: var(--bg-card); border: 1px solid #ffffff05"
        @touchstart="touchStart"
        @touchend="(e) => touchEnd(e, 'client')"
      >
        <!-- Background Effects -->
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--accent-dim)] to-transparent rounded-bl-full opacity-20"
        />

        <!-- Content -->
        <div
          class="relative z-10 w-full min-h-[140px] flex flex-col justify-center"
        >
          <Transition name="slide-fade" mode="out-in">
            <div :key="clientSlide">
              <component
                :is="clientFeatures[clientSlide].icon"
                :size="32"
                class="mx-auto mb-4"
                :class="clientFeatures[clientSlide].iconClass"
              />
              <h3 class="text-xl font-bold mb-2">
                {{ clientFeatures[clientSlide].title }}
              </h3>
              <p class="text-[14px] opacity-60 mb-6 px-4">
                {{ clientFeatures[clientSlide].desc }}
              </p>
            </div>
          </Transition>
        </div>

        <!-- Indicators -->
        <div class="flex justify-center gap-2 mt-auto relative z-10">
          <button
            v-for="(_, idx) in clientFeatures"
            :key="idx"
            @click="clientSlide = idx"
            class="h-2 rounded-full transition-all duration-300"
            :class="clientSlide === idx ? 'w-6!' : 'w-2 bg-white/20!'"
            :style="
              clientSlide === idx
                ? { background: clientFeatures[clientSlide].color }
                : {}
            "
          />
        </div>
      </div>
    </section>

    <!-- For Barbers -->
    <section class="px-6 mb-12">
      <div class="flex items-center gap-3 mb-6">
        <div class="h-[1px] flex-1 bg-white/10" />
        <span class="text-[12px] font-bold uppercase tracking-widest opacity-50"
          >Sartaroshlar uchun</span
        >
        <div class="h-[1px] flex-1 bg-white/10" />
      </div>

      <!-- Barber Features Slider -->
      <div
        class="relative p-6 rounded-[32px] overflow-hidden min-h-[220px] flex flex-col items-center justify-center text-center transition-all duration-500"
        style="
          background: linear-gradient(135deg, #1e1810 0%, #2a2117 100%);
          border: 1px solid var(--accent-dim);
        "
        @touchstart="touchStart"
        @touchend="(e) => touchEnd(e, 'barber')"
      >
        <!-- Background Effects -->
        <div
          class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20"
          style="background: var(--accent)"
        />

        <!-- Content -->
        <div
          class="relative z-10 w-full min-h-[140px] flex flex-col justify-center"
        >
          <Transition name="slide-fade" mode="out-in">
            <div :key="barberSlide">
              <component
                :is="barberFeatures[barberSlide].icon"
                :size="32"
                class="mx-auto mb-4"
                :style="{ color: 'var(--accent)' }"
              />
              <h3 class="text-xl font-bold mb-2">
                {{ barberFeatures[barberSlide].title }}
              </h3>
              <p class="text-[14px] opacity-60 mb-6 px-4">
                {{ barberFeatures[barberSlide].desc }}
              </p>
            </div>
          </Transition>
        </div>

        <!-- Indicators -->
        <div class="flex justify-center gap-2 mt-auto relative z-10">
          <button
            v-for="(_, idx) in barberFeatures"
            :key="idx"
            @click="barberSlide = idx"
            class="h-2 rounded-full transition-all duration-300"
            :class="barberSlide === idx ? 'w-6!' : 'w-2 bg-white/20!'"
            :style="barberSlide === idx ? { background: 'var(--accent)' } : {}"
          />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center px-6 pb-6 pt-10 opacity-40">
      <p class="text-[12px]">
        © 2026 Barber App. Barcha huquqlar himoyalangan.
      </p>
    </footer>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  Scissors,
  CalendarDays,
  Star,
  Wallet,
  Users,
  Clock,
  Bell,
} from "lucide-vue-next";

const router = useRouter();
const authStore = useAuthStore();
const clientSlide = ref(0);
const barberSlide = ref(0);
let intervalId = null;

const clientFeatures = [
  {
    icon: CalendarDays,
    title: "Onlayn Navbat",
    desc: "Uydan chiqmasdan o'z vaqtingizni band qiling",
    color: "var(--accent)",
    iconClass: "text-[var(--accent)]",
  },
  {
    icon: Star,
    title: "Reyting Tizimi",
    desc: "Eng yaxshi ustalar va haqiqiy sharhlar",
    color: "#eab308",
    iconClass: "text-yellow-500",
  },
  {
    icon: Bell,
    title: "Smart Eslatmalar",
    desc: "Ballaringiz va navbatingiz haqida eslatmalar",
    color: "#60a5fa",
    iconClass: "text-blue-400",
  },
];

const barberFeatures = [
  {
    icon: Wallet,
    title: "Moliyaviy Nazorat",
    desc: "Daromad va xarajatlaringizni to'liq nazorat qiling",
  },
  {
    icon: Users,
    title: "Mijozlar Bazasi",
    desc: "Har bir mijoz tarixi va ma'lumotlarini saqlang",
  },
  {
    icon: Clock,
    title: "Ish Grafigi",
    desc: "Ish vaqtlaringizni qulay tarzda boshqaring",
  },
];
const nextSlide = (section) => {
  if (section === "client") {
    clientSlide.value = (clientSlide.value + 1) % clientFeatures.length;
  } else {
    barberSlide.value = (barberSlide.value + 1) % barberFeatures.length;
  }
};

const prevSlide = (section) => {
  if (section === "client") {
    clientSlide.value =
      (clientSlide.value - 1 + clientFeatures.length) % clientFeatures.length;
  } else {
    barberSlide.value =
      (barberSlide.value - 1 + barberFeatures.length) % barberFeatures.length;
  }
};

// Touch handling
let touchStartX = 0;
const touchStart = (e) => (touchStartX = e.touches[0].clientX);
const touchEnd = (e, section) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // Next
      nextSlide(section);
    } else {
      // Prev
      prevSlide(section);
    }
  }
};

// Auto scroll moved removed as per request

const handleStart = () => {
  if (authStore.isAuthenticated) {
    const path = authStore.role === "mijoz" ? "/c/home" : "/b/dashboard";
    router.push(path);
  } else {
    router.push("/role");
  }
};
</script>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Slide Fade Animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
