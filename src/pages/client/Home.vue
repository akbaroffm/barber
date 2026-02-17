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
            @click="openLocationPicker"
            class="text-[14px] font-bold flex items-center gap-1.5 transition-active active:opacity-50"
          >
            <MapPin :size="13" style="color: var(--accent)" />
            <span class="truncate max-w-[200px]">{{ clientAddress }}</span>
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

    <!-- Location Picker BottomSheet -->
    <BottomSheet
      :isOpen="isLocationPickerOpen"
      title="Manzilni tanlang"
      @close="isLocationPickerOpen = false"
    >
      <div class="flex flex-col gap-4 pb-8">
        <div
          class="aspect-square w-full rounded-2xl overflow-hidden relative"
          style="background: #2a2117"
        >
          <BaseMap
            mode="select"
            :initial-location="clientLocation ? [clientLocation.lat, clientLocation.lng] : null"
            @update:location="handleLocationUpdate"
          />
          
          <div
            class="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md z-[500]"
          >
            <span class="text-[12px] font-medium text-white"
              >Xaritadan joylashuvingizni belgilang</span
            >
          </div>
        </div>
        <div class="p-4 rounded-xl" style="background: var(--bg-input)">
          <span class="text-[13px] font-medium block mb-1 opacity-50"
            >Tanlangan manzil:</span
          >
          <span class="text-[14px] font-bold"
            >{{ tempAddress || "Hali tanlanmagan" }}</span
          >
        </div>
        <button
          @click="confirmLocation"
          class="w-full py-4 rounded-2xl text-[15px] font-bold"
          :class="!tempLocation ? 'opacity-50' : ''"
          :disabled="!tempLocation"
          style="background: var(--accent); color: #000"
        >
          Tasdiqlash
        </button>
      </div>
    </BottomSheet>

    <!-- Map View Overlay -->
    <div
      v-if="isMapOpen"
      class="fixed inset-0 z-[100] flex flex-col"
      style="background: var(--bg-primary)"
    >
      <div
        class="px-4 py-3 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md absolute top-0 left-0 right-0 z-[101]"
      >
        <h2 class="text-[16px] font-bold">Xaritadan qidirish</h2>
        <button
          @click="isMapOpen = false"
          class="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 active:bg-white/20"
        >
          <X :size="18" />
        </button>
      </div>

      <div class="flex-1 relative mt-[58px]">
        <BaseMap
          mode="view"
          :markers="mapMarkers"
          @marker-click="handleMarkerClick"
        />
      </div>

      <!-- Selected Barber Preview (if any) -->
      <!-- We could add a small preview card here when a marker is clicked, but simple navigation is easier for now -->
    </div>

    <!-- Map Float Button -->
    <button
      v-if="!isMapOpen"
      @click="openMap"
      class="fixed bottom-18 right-5 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 transition-transform active:scale-95"
      style="
        background: var(--accent);
        color: #000;
        box-shadow: 0 4px 20px rgba(200, 149, 46, 0.4);
      "
    >
      <Map :size="24" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useBarberStore } from "@/stores/barber";
import { useNotificationStore } from "@/stores/notification";
import { useFavoritesStore } from "@/stores/favorites";
import { useRouter } from "vue-router";
import BaseMap from "@/components/common/BaseMap.vue";
import BottomSheet from "@/components/ui/BottomSheet.vue"; // Imported BottomSheet
import { calculateDistance } from "@/utils/location"; // Imported distance utility
import storage from "@/utils/storage";

import {
  Search,
  Star,
  MapPin,
  Heart,
  Bell,
  Clock,
  Wallet,
  RefreshCcw,
  Map,
  X
} from "lucide-vue-next";
import telegram from "@/services/telegram";

const barberStore = useBarberStore();
const notifStore = useNotificationStore();
const favoritesStore = useFavoritesStore();
const router = useRouter();

const search = ref("");
const activeFilter = ref("all");
const isMapOpen = ref(false);

// Location State
const isLocationPickerOpen = ref(false);
const clientLocation = ref(storage.get('client_location') || { lat: 41.2995, lng: 69.2401 }); // Default Tashkent
const clientAddress = ref(storage.get('client_address') || "Toshkent, O'zbekiston");
const tempLocation = ref(null);
const tempAddress = ref("");

const openLocationPicker = () => {
  telegram.HapticFeedback?.impactOccurred("light");
  tempLocation.value = clientLocation.value;
  tempAddress.value = clientAddress.value;
  isLocationPickerOpen.value = true;
};

const handleLocationUpdate = ({ lat, lng }) => {
  tempLocation.value = { lat, lng };
  // Simulating reverse geocoding
  tempAddress.value = `Toshkent, ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};

const confirmLocation = () => {
  if (!tempLocation.value) return;
  
  clientLocation.value = tempLocation.value;
  clientAddress.value = tempAddress.value;
  
  storage.set('client_location', clientLocation.value);
  storage.set('client_address', clientAddress.value);

  telegram.HapticFeedback?.notificationOccurred("success");
  isLocationPickerOpen.value = false;
};

const toggleFavorite = (barberId) => {
  favoritesStore.toggleFavorite(barberId);
  telegram.HapticFeedback?.impactOccurred("light");
};

const openMap = () => {
  isMapOpen.value = true;
  telegram.HapticFeedback?.impactOccurred("light");
};

const handleMarkerClick = (marker) => {
  router.push(`/c/barber/${marker.id}`);
};

const unread = computed(
  () => notifStore.notifications.filter((n) => !n.read).length,
);

// Barbers with calculated distance
const barbersWithDistance = computed(() => {
  return barberStore.barbers.map(b => {
    // Determine barber location (mock if missing)
    const bLat = b.location?.lat || 41.2995 + (Math.random() - 0.5) * 0.1;
    const bLng = b.location?.lng || 69.2401 + (Math.random() - 0.5) * 0.1;
    
    // Calculate distance from client
    const dist = calculateDistance(
      clientLocation.value.lat, 
      clientLocation.value.lng,
      bLat,
      bLng
    );
    
    return {
      ...b,
      _lat: bLat, // Store for map markers
      _lng: bLng,
      distance: `${dist} km` // Override string distance with calculated
    };
  });
});

const popularBarber = computed(
  () =>
    [...barbersWithDistance.value].sort(
      (a, b) => (b.reviewCount || 0) - (a.reviewCount || 0),
    )[0],
);

const setFilter = (f) => {
  activeFilter.value = activeFilter.value === f ? "all" : f;
};

const displayBarbers = computed(() => {
  let list = [...barbersWithDistance.value];
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

const mapMarkers = computed(() => {
  return barbersWithDistance.value.map(b => ({
    id: b.id,
    lat: b._lat,
    lng: b._lng,
    title: b.name
  }));
});
</script>
```
