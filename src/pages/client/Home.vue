<template>
  <div class="pb-24">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 pt-3 pb-2">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold"
          style="background: var(--accent); color: #000"
        >
          {{ telegram.user.first_name?.[0] || "M" }}
        </div>
        <div>
          <span class="text-[11px] block" style="color: var(--text-secondary)"
            >Sizning manzilingiz</span
          >
          <button
            @click="refreshLocation"
            class="text-[14px] font-bold flex items-center gap-1.5 transition-active active:opacity-50"
          >
            <MapPin :size="13" style="color: var(--accent)" />
            <span>Toshkent, O'zbekiston</span>
            <RefreshCcw :size="10" class="opacity-40" />
          </button>
        </div>
      </div>
      <div class="flex gap-2">
        <button
          @click="$router.push('/c/favorites')"
          class="w-9 h-9 rounded-full flex items-center justify-center relative"
          style="background: var(--bg-card)"
        >
          <Heart :size="18" style="color: var(--accent)" />
          <span
            v-if="favoritesStore.favoritesCount > 0"
            class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style="background: var(--accent); color: #000"
            >{{ favoritesStore.favoritesCount }}</span
          >
        </button>
        <button
          @click="$router.push('/c/notifications')"
          class="w-9 h-9 rounded-full flex items-center justify-center relative"
          style="background: var(--bg-card)"
        >
          <Bell :size="18" style="color: var(--accent)" />
          <span
            v-if="unread > 0"
            class="absolute top-1 right-1 w-2 h-2 rounded-full"
            style="background: var(--red)"
          />
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="px-4 pt-1 pb-4">
      <div class="relative">
        <Search
          :size="18"
          class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style="color: var(--text-secondary)"
        />
        <input
          v-model="search"
          type="text"
          placeholder="Sartarosh qidiring..."
          class="pl-10! pr-4"
          style="background: var(--bg-card); border-radius: 14px"
        />
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex justify-center gap-6 px-4 pb-5">
      <button
        @click="setFilter('near')"
        class="flex flex-col items-center gap-1.5"
      >
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center"
          :style="{
            background:
              activeFilter === 'near' ? 'var(--accent)' : 'var(--bg-card)',
          }"
        >
          <MapPin
            :size="20"
            :style="{
              color: activeFilter === 'near' ? '#000' : 'var(--accent)',
            }"
          />
        </div>
        <span
          class="text-[11px] font-medium"
          style="color: var(--text-secondary)"
          >Yaqinlar</span
        >
      </button>
      <button
        @click="setFilter('rating')"
        class="flex flex-col items-center gap-1.5"
      >
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center"
          :style="{
            background:
              activeFilter === 'rating' ? 'var(--accent)' : 'var(--bg-card)',
          }"
        >
          <Star
            :size="20"
            :style="{
              color: activeFilter === 'rating' ? '#000' : 'var(--accent)',
            }"
          />
        </div>
        <span
          class="text-[11px] font-medium"
          style="color: var(--text-secondary)"
          >Eng yaxshi</span
        >
      </button>
      <button
        @click="setFilter('cheap')"
        class="flex flex-col items-center gap-1.5"
      >
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center"
          :style="{
            background:
              activeFilter === 'cheap' ? 'var(--accent)' : 'var(--bg-card)',
          }"
        >
          <Wallet
            :size="20"
            :style="{
              color: activeFilter === 'cheap' ? '#000' : 'var(--accent)',
            }"
          />
        </div>
        <span
          class="text-[11px] font-medium"
          style="color: var(--text-secondary)"
          >Arzonlar</span
        >
      </button>
    </div>

    <!-- Popular Barber (Featured) -->
    <div v-if="!search && popularBarber" class="px-4 mb-5">
      <h3 class="text-[17px] font-bold mb-3">Mashhur sartaroshlar</h3>
      <button
        @click="$router.push(`/c/barber/${popularBarber.id}`)"
        class="w-full rounded-2xl overflow-hidden text-left relative"
        style="background: var(--bg-card)"
      >
        <img :src="popularBarber.cover" class="w-full h-44 object-cover" />
        <div
          class="absolute top-0 left-0 right-0 h-44"
          style="
            background: linear-gradient(
              to top,
              var(--bg-primary) 5%,
              transparent 60%
            );
          "
        />
        <div class="absolute bottom-16 left-4 right-4">
          <span
            class="text-[18px] font-bold block"
            style="color: var(--text-primary)"
            >{{ popularBarber.name }}</span
          >
          <span
            class="text-[13px] font-medium"
            :style="{
              color: popularBarber.isOpen ? 'var(--green)' : 'var(--red)',
            }"
            >{{ popularBarber.isOpen ? "Ochiq" : "Yopiq" }}</span
          >
        </div>
        <div class="px-4 py-3 flex items-center justify-between">
          <span
            class="text-[12px] flex items-center gap-1"
            style="color: var(--text-secondary)"
          >
            <Clock :size="12" /> {{ popularBarber.workHours }}
          </span>
          <div class="flex items-center gap-3">
            <span
              class="text-[12px] flex items-center gap-0.5 font-medium"
              style="color: var(--accent)"
            >
              <Star :size="12" style="color: var(--accent)" />
              {{ popularBarber.rating }}
            </span>
            <span
              class="text-[12px] flex items-center gap-0.5"
              style="color: var(--text-secondary)"
            >
              <MapPin :size="12" /> {{ popularBarber.distance }}
            </span>
          </div>
        </div>
      </button>
    </div>

    <!-- Nearby / Filtered list -->
    <div class="px-4">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-[17px] font-bold">
          {{ search ? "Natijalar" : "Sizga yaqin" }}
        </h3>
        <button
          v-if="!search"
          @click="setFilter('all')"
          class="text-[13px] font-semibold"
          style="color: var(--accent)"
        >
          Hammasi
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="barber in displayBarbers"
          :key="barber.id"
          @click="$router.push(`/c/barber/${barber.id}`)"
          class="rounded-2xl overflow-hidden text-left"
          style="background: var(--bg-card)"
        >
          <div class="relative">
            <img :src="barber.image" class="w-full h-28 object-cover" />
            <div
              class="absolute bottom-0 left-0 right-0 h-16"
              style="
                background: linear-gradient(
                  to top,
                  var(--bg-card),
                  transparent
                );
              "
            />
            <button
              @click.stop="toggleFavorite(barber.id)"
              class="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm"
              style="background: rgba(0, 0, 0, 0.4)"
            >
              <Heart
                :size="14"
                :fill="
                  favoritesStore.isFavorite(barber.id)
                    ? 'var(--accent)'
                    : 'transparent'
                "
                :style="{
                  color: favoritesStore.isFavorite(barber.id)
                    ? 'var(--accent)'
                    : '#fff',
                }"
              />
            </button>
            <span
              class="absolute bottom-2 left-2.5 text-[13px] font-semibold truncate pr-2"
              style="color: var(--text-primary)"
              >{{ barber.name }}</span
            >
          </div>
          <div class="px-2.5 py-2.5">
            <div class="flex items-center gap-2 mb-1">
              <span
                class="flex items-center gap-0.5 text-[11px] font-medium"
                style="color: var(--accent)"
              >
                <Star :size="11" style="color: var(--accent)" />
                {{ barber.rating }}
              </span>
              <span
                class="text-[11px] flex items-center gap-0.5"
                style="color: var(--text-secondary)"
              >
                <MapPin :size="11" /> {{ barber.distance }}
              </span>
            </div>
            <span
              class="text-[11px] font-medium"
              :style="{ color: barber.isOpen ? 'var(--green)' : 'var(--red)' }"
              >{{ barber.isOpen ? "Ochiq" : "Yopiq" }}</span
            >
            <div class="flex items-center gap-1 mt-0.5">
              <Clock :size="10" style="color: var(--text-muted)" />
              <span class="text-[10px]" style="color: var(--text-muted)">{{
                barber.workHours
              }}</span>
            </div>
          </div>
        </button>
      </div>

      <div v-if="displayBarbers.length === 0" class="py-16 text-center">
        <p class="text-[15px]" style="color: var(--text-secondary)">
          Hozircha ma'lumot yo'q
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBarberStore } from "@/stores/barber";
import { useNotificationStore } from "@/stores/notification";
import { useFavoritesStore } from "@/stores/favorites";
import {
  Search,
  Star,
  MapPin,
  Heart,
  Bell,
  Clock,
  Wallet,
  RefreshCcw,
} from "lucide-vue-next";
import telegram from "@/services/telegram";

const barberStore = useBarberStore();
const notifStore = useNotificationStore();
const favoritesStore = useFavoritesStore();
const search = ref("");
const activeFilter = ref("all");

const refreshLocation = () => {
  telegram.HapticFeedback?.impactOccurred("medium");
  telegram.showAlert?.("Joylashuvingiz yangilandi (simulyatsiya)");
};

const toggleFavorite = (barberId) => {
  favoritesStore.toggleFavorite(barberId);
  telegram.HapticFeedback?.impactOccurred("light");
};

const unread = computed(
  () => notifStore.notifications.filter((n) => !n.read).length,
);
const popularBarber = computed(
  () =>
    [...barberStore.barbers].sort(
      (a, b) => (b.reviewCount || 0) - (a.reviewCount || 0),
    )[0],
);

const setFilter = (f) => {
  activeFilter.value = activeFilter.value === f ? "all" : f;
};

const displayBarbers = computed(() => {
  let list = [...barberStore.barbers];
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter((b) => b.name.toLowerCase().includes(q));
  }
  if (activeFilter.value === "rating") list.sort((a, b) => b.rating - a.rating);
  if (activeFilter.value === "cheap")
    list.sort((a, b) => a.minPrice - b.minPrice);
  if (activeFilter.value === "near")
    list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  if (!search.value && popularBarber.value)
    list = list.filter((b) => b.id !== popularBarber.value.id);
  return list;
});
</script>
