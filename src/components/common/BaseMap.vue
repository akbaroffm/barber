<template>
  <div class="relative w-full h-full rounded-2xl overflow-hidden z-0">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
      class="w-full h-full"
      @click="handleMapClick"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />

      <!-- Current Location Marker (if selected) -->
      <l-marker
        v-if="mode === 'select' && selectedLocation"
        :lat-lng="selectedLocation"
        :icon="defaultIcon"
      />

      <!-- Barber Markers (View Mode) -->
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="[marker.lat, marker.lng]"
        :icon="defaultIcon"
        @click="$emit('marker-click', marker)"
      >
        <l-tooltip>{{ marker.title }}</l-tooltip>
      </l-marker>
    </l-map>

    <!-- Controls -->
    <div class="absolute bottom-4 right-4 z-[400] flex flex-col gap-2">
      <button
        @click="locateUser"
        class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        title="Mening joylashuvim"
      >
        <MapPin :size="20" class="text-black" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
// Fix default icon issues using CDN
// We define explicit icon object below instead of relying on global defaults
import L from "leaflet";

const props = defineProps({
  mode: {
    type: String,
    default: "view", // 'view' or 'select'
  },
  markers: {
    type: Array,
    default: () => [],
  },
  initialCenter: {
    type: Array,
    default: () => [41.2995, 69.2401], // Tashkent default
  },
  initialLocation: {
    type: Array,
    default: null,
  },
});

const emit = defineEmits(["update:location", "marker-click"]);

const zoom = ref(13);
const center = ref(props.initialCenter);
const selectedLocation = ref(props.initialLocation);
const map = ref(null);

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// Watchers
watch(
  () => props.initialCenter,
  (newCenter) => {
    if (newCenter) center.value = newCenter;
  },
);

watch(
  () => props.initialLocation,
  (newLoc) => {
    if (newLoc) selectedLocation.value = newLoc;
  },
);

// Methods
const handleMapClick = (e) => {
  if (props.mode === "select") {
    const { lat, lng } = e.latlng;
    selectedLocation.value = [lat, lng];
    emit("update:location", { lat, lng });
  }
};

const locateUser = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        center.value = [latitude, longitude];
        zoom.value = 15;

        if (props.mode === "select") {
          selectedLocation.value = [latitude, longitude];
          emit("update:location", { lat: latitude, lng: longitude });
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Joylashuvni aniqlab bo'lmadi. Iltimos, ruxsat bering.");
      },
    );
  } else {
    alert("Brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi.");
  }
};

onMounted(() => {
  // If we have an initial location, center on it
  if (props.initialLocation) {
    center.value = props.initialLocation;
    zoom.value = 15;
  }
});
</script>

<style>
/* Leaflet z-index fix */
.leaflet-pane {
  z-index: 10 !important; /* Lower than your app modals/overlays */
}
.leaflet-top,
.leaflet-bottom {
  z-index: 20 !important;
}
</style>
