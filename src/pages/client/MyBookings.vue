<template>
  <div class="pb-24">
    <!-- Header -->
    <!-- Header -->
    <div
      class="flex items-center justify-between px-4 pt-3 pb-2 sticky top-0 z-50 backdrop-blur-md"
      style="background: var(--bg-primary-alpha, rgba(22, 18, 12, 0.8))"
    >
      <div class="flex items-center gap-3">
        <button
          @click="$router.back()"
          class="w-9 h-9 rounded-full flex items-center justify-center transition-active active:scale-95"
          style="background: var(--bg-card)"
        >
          <ChevronLeft :size="20" style="color: var(--text-primary)" />
        </button>
        <h1 class="text-xl font-bold">Navbatlarim</h1>
      </div>
      <button
        class="w-8 h-8 rounded-full flex items-center justify-center"
        style="background: var(--bg-card)"
      >
        <MoreHorizontal :size="18" style="color: var(--text-secondary)" />
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 px-4 mb-4">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-full text-[13px] font-semibold"
        :style="{
          background: activeTab === tab.id ? 'var(--accent)' : 'var(--bg-card)',
          color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
        }"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="filtered.length === 0"
      class="flex flex-col items-center pt-20 text-center px-6"
    >
      <CalendarDays :size="40" style="color: var(--text-muted)" />
      <p class="text-[15px] mt-4 mb-4" style="color: var(--text-secondary)">
        Navbatlar hali yo'q
      </p>
      <button
        @click="$router.push('/c/home')"
        class="text-[15px] font-semibold"
        style="color: var(--accent)"
      >
        Sartarosh qidirish
      </button>
    </div>

    <!-- Bookings list -->
    <div v-else class="px-4 flex flex-col gap-3">
      <button
        v-for="b in filtered"
        :key="b.id"
        @click="openDetail(b)"
        class="p-4 rounded-2xl text-left relative"
        style="background: var(--bg-card)"
      >
        <!-- Guest badge -->
        <div class="flex items-center gap-2 mb-2.5">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center"
            style="background: var(--accent-dim)"
          >
            <Users :size="14" style="color: var(--accent)" />
          </div>
          <div>
            <span class="text-[14px] font-semibold block"
              >{{ b.guestCount || 1 }} Mehmon</span
            >
            <span class="text-[11px]" style="color: var(--text-secondary)"
              >{{ b.services ? b.services.length : 1 }} xizmat paketi</span
            >
          </div>
        </div>

        <div
          class="pl-1"
          style="border-left: 2px solid var(--separator); margin-left: 15px"
        >
          <div class="pl-4 pb-2">
            <span
              class="text-[11px] block mb-0.5"
              style="color: var(--text-muted)"
              >Order ID: {{ b.id }}</span
            >
            <span class="text-[14px] font-semibold block">{{
              b.barberName
            }}</span>
            <span
              class="text-[12px] flex items-center gap-1 mt-0.5"
              style="color: var(--text-secondary)"
            >
              <CalendarDays :size="11" /> {{ formatDate(b.date) }}, {{ b.time }}
            </span>
          </div>
        </div>

        <!-- Status -->
        <div class="mt-2">
          <span
            v-if="b.status === 'yangi'"
            class="text-[13px] font-semibold px-3 py-1.5 rounded-lg inline-block"
            style="background: var(--accent-dim); color: var(--accent)"
          >
            Kutilmoqda
          </span>
          <span
            v-else-if="b.status === 'tasdiqlangan'"
            class="text-[13px] font-semibold px-3 py-1.5 rounded-lg inline-block"
            style="background: var(--green-dim); color: var(--green)"
          >
            Tasdiqlangan
          </span>
          <span
            v-else-if="b.status === 'bajarilgan'"
            class="text-[13px] font-semibold px-3 py-1.5 rounded-lg inline-block"
            style="background: var(--green-dim); color: var(--green)"
          >
            Muvaffaqiyatli
          </span>
          <span
            v-else-if="b.status === 'bekor'"
            class="text-[13px] font-semibold px-3 py-1.5 rounded-lg inline-block"
            style="background: var(--red-dim); color: var(--red)"
          >
            Bekor qilingan
          </span>
        </div>

        <!-- Three dots -->
        <MoreVertical
          :size="16"
          class="absolute top-4 right-4"
          style="color: var(--text-muted)"
        />
      </button>
    </div>

    <!-- Booking Detail Bottom Sheet -->
    <transition name="sheet">
      <div
        v-if="detailBooking"
        class="fixed inset-0 z-[100] flex flex-col justify-end"
      >
        <div
          class="absolute inset-0 bg-black/50"
          @click="detailBooking = null"
        />
        <div
          class="relative rounded-t-3xl overflow-y-auto max-w-[400px] mx-auto"
          style="background: var(--bg-primary); max-height: 90vh"
        >
          <div
            class="w-9 h-1 rounded-full mx-auto mt-3 mb-2"
            style="background: var(--separator)"
          />

          <!-- E-Ticket Header -->
          <div class="flex items-center justify-between px-5 pt-2 pb-4">
            <h3 class="text-[17px] font-bold">
              {{ detailBooking.barberName }}
            </h3>
            <button
              @click="detailBooking = null"
              class="text-[13px] font-medium"
              style="color: var(--accent)"
            >
              Yopish
            </button>
          </div>

          <!-- E-Ticket Card -->
          <div
            class="mx-5 p-4 rounded-2xl mb-4"
            style="background: var(--bg-card)"
          >
            <div class="flex justify-between items-center mb-3">
              <span class="text-[15px] font-bold">E-Ticket</span>
              <span
                class="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                :style="statusBadge(detailBooking.status)"
              >
                {{ statusLabels[detailBooking.status] }}
              </span>
            </div>
            <div class="text-[12px] mb-1" style="color: var(--text-secondary)">
              <span>Raqam: #{{ detailBooking.id.slice(-6) }}</span>
            </div>
          </div>

          <!-- Barber Info -->
          <div
            class="mx-5 flex gap-3 p-3 rounded-2xl mb-4"
            style="background: var(--bg-card)"
          >
            <img
              v-if="detailBooking.barberImage"
              :src="detailBooking.barberImage"
              class="w-14 h-14 rounded-xl object-cover shrink-0"
            />
            <div class="flex-1 min-w-0">
              <span class="text-[15px] font-semibold block mb-0.5">{{
                detailBooking.barberName
              }}</span>
              <span
                class="text-[12px] flex items-center gap-1 mb-0.5"
                style="color: var(--text-secondary)"
              >
                <Clock :size="11" />
                {{ detailBooking.barberWorkHours || "09:00 – 20:00" }}
              </span>
              <div class="flex items-center gap-3">
                <span
                  class="text-[12px] flex items-center gap-0.5 font-medium"
                  style="color: var(--accent)"
                >
                  <Star :size="11" style="color: var(--accent)" />
                  {{ detailBooking.barberRating || "4.8" }}
                </span>
                <span
                  class="text-[12px] flex items-center gap-0.5"
                  style="color: var(--text-secondary)"
                >
                  <MapPin :size="11" /> {{ detailBooking.barberDistance || "" }}
                </span>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div
            v-if="detailBooking.barberAddress"
            class="mx-5 flex items-center gap-3 p-3 rounded-2xl mb-4 text-left"
            style="background: var(--bg-card)"
          >
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style="background: var(--accent-dim)"
            >
              <MapPin :size="16" style="color: var(--accent)" />
            </div>
            <div class="flex-1 min-w-0">
              <span
                class="text-[11px] block"
                style="color: var(--text-secondary)"
                >Manzil</span
              >
              <span
                class="text-[13px] font-semibold truncate block"
                style="color: var(--accent)"
                >{{ detailBooking.barberAddress }}</span
              >
            </div>
            <div class="flex gap-2 shrink-0">
              <div
                class="w-8 h-8 rounded-xl flex items-center justify-center"
                style="background: var(--bg-elevated)"
              >
                <Phone :size="14" style="color: var(--accent)" />
              </div>
              <div
                class="w-8 h-8 rounded-xl flex items-center justify-center"
                style="background: var(--accent)"
              >
                <Navigation :size="14" style="color: #000" />
              </div>
            </div>
          </div>

          <!-- Order Details -->
          <div
            class="mx-5 p-4 rounded-2xl mb-4"
            style="background: var(--bg-card)"
          >
            <div class="flex items-center gap-2 mb-3">
              <Users :size="14" style="color: var(--accent)" />
              <span class="text-[14px] font-semibold"
                >{{ detailBooking.guestCount || 1 }} Mehmon</span
              >
              <span class="text-[12px]" style="color: var(--text-secondary)"
                >·
                {{
                  detailBooking.services ? detailBooking.services.length : 1
                }}
                xizmat</span
              >
            </div>
            <div class="text-[12px] mb-1" style="color: var(--text-secondary)">
              Order ID: {{ detailBooking.id }}
            </div>
            <div class="text-[13px] font-medium mb-0.5">
              {{ detailBooking.barberName }}
            </div>
            <div
              class="text-[12px] flex items-center gap-1"
              style="color: var(--text-secondary)"
            >
              <CalendarDays :size="11" /> {{ formatDate(detailBooking.date) }},
              {{ detailBooking.time }}
            </div>

            <div
              class="mt-3 pt-3"
              style="border-top: 0.5px solid var(--separator)"
            >
              <span class="text-[13px] font-semibold block mb-2"
                >Mehmon: {{ detailBooking.clientName }}</span
              >
              <div
                v-if="detailBooking.services && detailBooking.services.length"
              >
                <div
                  v-for="s in detailBooking.services"
                  :key="s.id"
                  class="flex justify-between text-[13px] mb-1"
                >
                  <span style="color: var(--text-secondary)">{{ s.name }}</span>
                  <span class="font-medium"
                    >{{ s.price?.toLocaleString() }} so'm</span
                  >
                </div>
              </div>
              <div
                v-else
                class="text-[13px]"
                style="color: var(--text-secondary)"
              >
                {{ detailBooking.serviceName }}
              </div>
            </div>

            <div
              class="mt-3 pt-3 flex justify-between text-[15px] font-bold"
              style="border-top: 0.5px solid var(--separator)"
            >
              <span>Jami</span>
              <span style="color: var(--accent)"
                >{{ (detailBooking.price || 0).toLocaleString() }} so'm</span
              >
            </div>
          </div>

          <div class="h-8" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBookingStore } from "@/stores/booking";
import {
  CalendarDays,
  MoreHorizontal,
  MoreVertical,
  Users,
  Clock,
  Star,
  MapPin,
  Phone,
  Navigation,
  ChevronLeft,
} from "lucide-vue-next";

const bookingStore = useBookingStore();
const activeTab = ref("all");
const detailBooking = ref(null);

const tabs = [
  { id: "all", label: "Hammasi" },
  { id: "yangi", label: "Kutilmoqda" },
  { id: "tasdiqlangan", label: "Faol" },
  { id: "bajarilgan", label: "Tarix" },
];

const statusLabels = {
  yangi: "Kutilmoqda",
  tasdiqlangan: "Tasdiqlangan",
  bajarilgan: "Bajarildi",
  bekor: "Bekor",
};

const statusBadge = (s) => {
  if (s === "yangi")
    return { background: "var(--accent-dim)", color: "var(--accent)" };
  if (s === "tasdiqlangan")
    return { background: "var(--green-dim)", color: "var(--green)" };
  if (s === "bajarilgan")
    return { background: "var(--green-dim)", color: "var(--green)" };
  return { background: "var(--red-dim)", color: "var(--red)" };
};

const filtered = computed(() => {
  let list = [...bookingStore.bookings].reverse();
  if (activeTab.value === "all") return list;
  return list.filter((b) => b.status === activeTab.value);
});

const openDetail = (b) => {
  detailBooking.value = b;
};

const formatDate = (d) => {
  const dt = new Date(d);
  const days = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  return `${days[dt.getDay()]}, ${dt.getDate()} ${months[dt.getMonth()]}`;
};
</script>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.2s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
</style>
