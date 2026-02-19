<template>
  <div v-if="barber" class="pb-32">
    <!-- Hero Image -->
    <div class="relative">
      <img :src="barber.cover" class="w-full h-48 object-cover" />
      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(
            to top,
            var(--bg-primary) 0%,
            transparent 55%
          );
        "
      />
      <div class="sticky top-0 z-50 px-3 pt-3 pointer-events-none">
        <button
          @click="goBack"
          class="w-9 h-9 rounded-full flex items-center justify-center pointer-events-auto backdrop-blur-md"
          style="background: rgba(0, 0, 0, 0.4)"
        >
          <ChevronLeft :size="22" style="color: #fff" />
        </button>
      </div>
    </div>

    <div class="px-4 -mt-6 relative z-10">
      <!-- Barber Info -->
      <h1 class="text-lg font-bold mb-1">{{ barber.name }}</h1>
      <div class="flex items-center gap-3 mb-1.5">
        <span
          class="text-[13px] font-semibold"
          :style="{ color: barber.isOpen ? 'var(--green)' : 'var(--red)' }"
          >{{ barber.isOpen ? "Ochiq" : "Yopiq" }}</span
        >
        <span
          class="text-[12px] flex items-center gap-1"
          style="color: var(--text-secondary)"
          ><Clock :size="12" /> {{ barber.workHours }}</span
        >
      </div>
      <div class="flex items-center gap-4 mb-4">
        <span
          class="flex items-center gap-1 text-[13px] font-medium"
          style="color: var(--accent)"
          ><Star :size="13" style="color: var(--accent)" />
          {{ barber.rating }}</span
        >
        <span
          class="text-[13px] flex items-center gap-1"
          style="color: var(--text-secondary)"
          ><MapPin :size="13" /> {{ barber.distance }}</span
        >
      </div>

      <!-- Location -->
      <button
        @click="openLocation"
        class="w-full flex items-center gap-3 p-3 rounded-2xl mb-5 text-left"
        style="background: var(--bg-card)"
      >
        <div
          class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style="background: var(--accent-dim)"
        >
          <MapPin :size="16" style="color: var(--accent)" />
        </div>
        <div class="flex-1 min-w-0">
          <span class="text-[11px] block" style="color: var(--text-secondary)"
            >Manzil</span
          >
          <span
            class="text-[13px] font-semibold truncate block"
            style="color: var(--accent)"
            >{{ barber.address }}</span
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
      </button>

      <!-- Select Schedule -->
      <h3 class="text-[15px] font-bold mb-3">Sanani tanlang</h3>
      <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-5">
        <button
          v-for="date in availableDates"
          :key="date.iso"
          @click="selectDate(date)"
          class="flex flex-col items-center px-3.5 py-2.5 rounded-2xl shrink-0 min-w-[64px]"
          :style="{
            background:
              selectedDate?.iso === date.iso
                ? 'var(--accent)'
                : 'var(--bg-card)',
          }"
        >
          <span
            class="text-[10px] font-semibold uppercase mb-0.5"
            :style="{
              color:
                selectedDate?.iso === date.iso
                  ? '#000'
                  : 'var(--text-secondary)',
            }"
            >{{ date.weekday }}</span
          >
          <span
            class="text-[18px] font-bold"
            :style="{
              color:
                selectedDate?.iso === date.iso ? '#000' : 'var(--text-primary)',
            }"
            >{{ date.day }}</span
          >
          <span
            class="text-[10px]"
            :style="{
              color:
                selectedDate?.iso === date.iso ? '#000' : 'var(--text-muted)',
            }"
            >{{ date.month }}</span
          >
        </button>
      </div>

      <!-- Select Time -->
      <h3 class="text-[15px] font-bold mb-3">Vaqtni tanlang</h3>
      <div class="flex flex-wrap gap-2 mb-5">
        <button
          v-for="time in timeSlots"
          :key="time.val"
          @click="time.available ? (selectedTime = time.val) : null"
          class="px-4 py-2.5 rounded-xl text-[13px] font-semibold"
          :style="{
            background:
              selectedTime === time.val
                ? 'var(--accent)'
                : time.available
                  ? 'var(--bg-card)'
                  : 'var(--bg-card)',
            color:
              selectedTime === time.val
                ? '#000'
                : time.available
                  ? 'var(--text-primary)'
                  : 'var(--text-muted)',
            opacity: time.available ? 1 : 0.4,
          }"
        >
          {{ time.available ? time.val : "🔒 " + time.val }}
        </button>
      </div>

      <!-- Select Guests -->
      <h3 class="text-[15px] font-bold mb-3">Mehmonlar soni</h3>
      <div class="flex gap-2 mb-5">
        <button
          v-for="g in [1, 2, 3, 4]"
          :key="g"
          @click="guestCount = g"
          class="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-center"
          :style="{
            background: guestCount === g ? 'var(--accent)' : 'var(--bg-card)',
            color: guestCount === g ? '#000' : 'var(--text-primary)',
          }"
        >
          {{ g }} {{ g === 1 ? "Mehmon" : "Mehmon" }}
        </button>
      </div>

      <!-- Select Services -->
      <h3 class="text-[15px] font-bold mb-3">Xizmat tanlang</h3>
      <div class="flex flex-col gap-2.5 mb-14">
        <button
          v-for="service in barber.services"
          :key="service.id"
          @click="toggleService(service)"
          class="flex gap-3 p-3 rounded-2xl text-left"
          :style="{
            background: isSelected(service.id)
              ? 'var(--accent-dim)'
              : 'var(--bg-card)',
            border: isSelected(service.id)
              ? '1px solid var(--accent)'
              : '1px solid transparent',
          }"
        >
          <img
            v-if="service.image"
            :src="service.image"
            class="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div class="flex-1 min-w-0">
            <span class="text-[14px] font-semibold block mb-0.5">{{
              service.name
            }}</span>
            <span
              class="text-[11px] block line-clamp-2 mb-1"
              style="color: var(--text-secondary)"
              >{{ service.desc || "" }}</span
            >
            <span class="text-[14px] font-bold" style="color: var(--accent)"
              >{{ service.price.toLocaleString() }} so'm</span
            >
          </div>
          <div
            class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1"
            :style="{
              borderColor: isSelected(service.id)
                ? 'var(--accent)'
                : 'var(--text-muted)',
            }"
          >
            <Check
              v-if="isSelected(service.id)"
              :size="14"
              style="color: var(--accent)"
            />
          </div>
        </button>
      </div>
    </div>

    <!-- Sticky Bottom Bar -->
    <div
      class="fixed bottom-14 left-0 right-0 z-40 pb-3 pt-3 w-[400px] mx-auto rounded-2xl"
      style="
        background: linear-gradient(to top, var(--bg-primary) 80%, transparent);
      "
    >
      <div class="flex items-center justify-between mb-3 px-1">
        <div>
          <span class="text-[12px] block" style="color: var(--text-secondary)"
            >{{ selectedServices.length }} xizmat tanlandi</span
          >
          <span class="text-[11px]" style="color: var(--text-muted)"
            >{{ guestCount }} mehmon</span
          >
        </div>
        <span class="text-xl font-bold" style="color: var(--accent)"
          >{{ totalPrice.toLocaleString() }} so'm</span
        >
      </div>
      <button
        @click="openPaymentModal"
        :disabled="!canConfirm"
        class="w-[300px] mx-auto py-3.5 rounded-2xl text-[16px] font-bold flex items-center justify-center gap-2"
        :style="{
          background: canConfirm ? 'var(--accent)' : 'var(--bg-elevated)',
          color: canConfirm ? '#000' : 'var(--text-muted)',
        }"
      >
        Navbatga yozilish
        <ChevronRight :size="18" />
      </button>
    </div>

    <!-- Payment Modal -->
    <transition name="sheet">
      <div
        v-if="showPayment"
        class="fixed inset-0 z-[100] flex items-end justify-center"
      >
        <div class="absolute inset-0 bg-black/15" @click="showPayment = false" />
        <div
          class="payment-sheet relative w-full max-w-[400px] mx-auto rounded-t-3xl px-5 pt-5 pb-8"
          style="background: var(--bg-card)"
        >
          <!-- Handle -->
          <div class="w-10 h-1 rounded-full mx-auto mb-5" style="background: var(--bg-elevated)" />

          <h2 class="text-[17px] font-bold mb-1">To'lovni tanlang</h2>
          <p class="text-[13px] mb-5" style="color: var(--text-secondary)">
            Navbatga yozilish uchun umumiy summaning
            <span class="font-bold" style="color: var(--accent)">30%</span>
            ni to'lash kerak
          </p>

          <!-- Amount breakdown -->
          <div
            class="flex items-center justify-between p-3.5 rounded-2xl mb-5"
            style="background: var(--bg-elevated)"
          >
            <div>
              <span class="text-[12px] block" style="color: var(--text-secondary)">Umumiy summa</span>
              <span class="text-[15px] font-semibold">{{ totalPrice.toLocaleString() }} so'm</span>
            </div>
            <div class="text-right">
              <span class="text-[12px] block" style="color: var(--text-secondary)">Avans (30%)</span>
              <span class="text-[17px] font-bold" style="color: var(--accent)">{{ depositAmount.toLocaleString() }} so'm</span>
            </div>
          </div>

          <!-- Warning Message -->
          <div
            class="p-3 rounded-xl mb-5 flex gap-3 items-start"
            style="background: var(--red-dim); border: 1px solid var(--red)"
          >
            <AlertCircle :size="18" class="shrink-0 pt-0.5" style="color: var(--red)" />
            <p class="text-[12px] leading-tight" style="color: var(--red)">
              <strong>Diqqat:</strong> Navbat bekor qilinganda to'langan avans summasi qaytarilmaydi.
            </p>
          </div>

          <!-- Click -->
          <button
            @click="payWith('click')"
            class="w-full flex items-center gap-4 p-4 rounded-2xl mb-3"
            style="background: var(--bg-elevated); border: 1.5px solid #00AAFF33"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-[22px]"
              style="background: #00AAFF18"
            >💳</div>
            <div class="flex-1 text-left">
              <span class="text-[15px] font-bold block">Click</span>
              <span class="text-[12px]" style="color: var(--text-secondary)">Click orqali to'lash</span>
            </div>
            <ChevronRight :size="18" style="color: var(--text-muted)" />
          </button>

          <!-- Payme -->
          <button
            @click="payWith('payme')"
            class="w-full flex items-center gap-4 p-4 rounded-2xl mb-2"
            style="background: var(--bg-elevated); border: 1.5px solid #00C88333"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-[22px]"
              style="background: #00C88318"
            >🟢</div>
            <div class="flex-1 text-left">
              <span class="text-[15px] font-bold block">Payme</span>
              <span class="text-[12px]" style="color: var(--text-secondary)">Payme orqali to'lash</span>
            </div>
            <ChevronRight :size="18" style="color: var(--text-muted)" />
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBarberStore } from "@/stores/barber";
import { useBookingStore } from "@/stores/booking";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Phone,
  Navigation,
  AlertCircle,
} from "lucide-vue-next";
import telegram from "@/services/telegram";

const route = useRoute();
const router = useRouter();
const barberStore = useBarberStore();
const bookingStore = useBookingStore();

const barber = computed(() =>
  barberStore.barbers.find((b) => b.id === route.params.id),
);

const selectedDate = ref(null);
const selectedTime = ref(null);
const guestCount = ref(1);
const selectedServices = ref([]);
const showPayment = ref(false);

const months = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyn",
  "Iyl",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];
const weekdays = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"];

const availableDates = computed(() => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push({
      iso: d.toISOString().split("T")[0],
      day: d.getDate(),
      month: months[d.getMonth()],
      weekday: weekdays[d.getDay()],
    });
  }
  return dates;
});

const timeSlots = [
  { val: "09:00", available: true },
  { val: "10:00", available: true },
  { val: "11:00", available: false },
  { val: "12:00", available: true },
  { val: "14:00", available: true },
  { val: "15:00", available: true },
  { val: "16:00", available: true },
  { val: "17:00", available: true },
  { val: "18:00", available: false },
];

const isSelected = (id) => selectedServices.value.includes(id);
const toggleService = (s) => {
  const i = selectedServices.value.indexOf(s.id);
  if (i >= 0) selectedServices.value.splice(i, 1);
  else selectedServices.value.push(s.id);
  telegram.HapticFeedback?.selectionChanged();
};

const selectDate = (d) => {
  selectedDate.value = d;
  telegram.HapticFeedback?.selectionChanged();
};

const totalPrice = computed(() => {
  if (!barber.value) return 0;
  const sum = barber.value.services
    .filter((s) => selectedServices.value.includes(s.id))
    .reduce((a, s) => a + s.price, 0);
  return sum * guestCount.value;
});

const depositAmount = computed(() => Math.round(totalPrice.value * 0.3));

const canConfirm = computed(
  () =>
    selectedDate.value &&
    selectedTime.value &&
    selectedServices.value.length > 0,
);

const openPaymentModal = () => {
  if (!canConfirm.value) return;
  telegram.HapticFeedback?.impactOccurred("medium");
  showPayment.value = true;
};

const confirmBooking = () => {
  const services = barber.value.services.filter((s) =>
    selectedServices.value.includes(s.id),
  );
  bookingStore.addBooking({
    barberId: barber.value.id,
    barberName: barber.value.name,
    barberImage: barber.value.image,
    barberAddress: barber.value.address,
    barberRating: barber.value.rating,
    barberDistance: barber.value.distance,
    barberWorkHours: barber.value.workHours,
    serviceId: services.map((s) => s.id).join(","),
    serviceName: services.map((s) => s.name).join(", "),
    services: services,
    date: selectedDate.value.iso,
    time: selectedTime.value,
    price: totalPrice.value,
    depositPaid: depositAmount.value,
    guestCount: guestCount.value,
    clientName: telegram.user.first_name || "Mijoz",
  });
  telegram.HapticFeedback?.notificationOccurred("success");
  showPayment.value = false;
  router.push({ name: "booking-success" });
};

const payWith = (provider) => {
  telegram.HapticFeedback?.impactOccurred("light");

  // To'lov URL-larini yasash (demo merchant ID bilan)
  const amount = depositAmount.value; // so'mda
  const amountTiyin = amount * 100;   // tiyin/`cent` birligida
  const orderId = `booking-${Date.now()}`;
  const description = encodeURIComponent(
    `Sartarosh navbati uchun avans to'lovi (30%)`
  );

  let payUrl = "";
  if (provider === "click") {
    // Click Deep Link format
    // https://my.click.uz/services/pay?service_id=<ID>&merchant_id=<ID>&amount=<AMOUNT>&transaction_param=<ORDER_ID>
    payUrl = `https://my.click.uz/services/pay?service_id=12345&merchant_id=12345&amount=${amount}&transaction_param=${orderId}&return_url=${encodeURIComponent(window.location.href)}`;
  } else if (provider === "payme") {
    // Payme checkout format
    // https://checkout.paycom.uz/<BASE64(m=<MERCHANT_ID>;ac.order_id=<ORDER_ID>;a=<AMOUNT>)>
    const params = btoa(`m=5e730e8e0b852a417aa49ceb;ac.order_id=${orderId};a=${amountTiyin};l=uz`);
    payUrl = `https://checkout.paycom.uz/${params}`;
  }

  // Bookingni qo'shib, to'lov sahifasiga yo'naltirish
  confirmBooking();
  window.open(payUrl, "_blank");
};

const goBack = () => router.back();

const openLocation = () => {
  const b = barber.value;
  if (b.location)
    window.open(
      `https://www.google.com/maps?q=${b.location.lat},${b.location.lng}`,
      "_blank",
    );
  telegram.HapticFeedback?.impactOccurred("light");
};

onMounted(() => {
  telegram.BackButton?.show();
  telegram.BackButton?.onClick(goBack);
});
onUnmounted(() => {
  telegram.BackButton?.hide();
});
</script>

<style scoped>
/* Overlay fade */
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.22s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

/* Bottom sheet inner slide-up */
.sheet-enter-active .payment-sheet,
.sheet-leave-active .payment-sheet {
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1);
}
.sheet-enter-from .payment-sheet,
.sheet-leave-to .payment-sheet {
  transform: translateY(100%);
}
</style>
