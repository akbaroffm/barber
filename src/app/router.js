import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
    {
        path: '/',
        component: () => import('@/pages/public/Landing.vue'),
        name: 'landing'
    },
    {
        path: '/role',
        component: () => import('@/pages/public/RoleSelect.vue'),
        name: 'role-select'
    },
    {
        path: '/login',
        component: () => import('@/pages/public/Login.vue'),
        name: 'login'
    },
    // Client Routes
    {
        path: '/c',
        meta: { requiresAuth: true, role: 'mijoz' },
        children: [
            { path: 'home', component: () => import('@/pages/client/Home.vue'), name: 'client-home' },
            { path: 'barber/:id', component: () => import('@/pages/client/BarberProfile.vue'), name: 'barber-profile' },
            { path: 'book/:id', component: () => import('@/pages/client/BookingWizard.vue'), name: 'booking-wizard' },
            { path: 'bookings', component: () => import('@/pages/client/MyBookings.vue'), name: 'client-bookings' },
            { path: 'notifications', component: () => import('@/pages/client/Notifications.vue'), name: 'client-notifications' },
            { path: 'settings', component: () => import('@/pages/client/Settings.vue'), name: 'client-settings' }
        ]
    },
    // Barber Routes
    {
        path: '/b',
        meta: { requiresAuth: true, role: 'sartarosh' },
        children: [
            { path: 'dashboard', component: () => import('@/pages/barber/Dashboard.vue'), name: 'barber-dashboard' },
            { path: 'bookings', component: () => import('@/pages/barber/BookingManagement.vue'), name: 'barber-bookings' },
            { path: 'services', component: () => import('@/pages/barber/ServicesList.vue'), name: 'barber-services' },
            { path: 'schedule', component: () => import('@/pages/barber/Schedule.vue'), name: 'barber-schedule' },
            { path: 'portfolio', component: () => import('@/pages/barber/PortfolioAchievements.vue'), name: 'barber-portfolio' },
            { path: 'settings', component: () => import('@/pages/barber/Settings.vue'), name: 'barber-settings' }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    if (to.path === '/' && authStore.isAuthenticated) {
        if (authStore.role === 'mijoz') return next('/c/home');
        if (authStore.role === 'sartarosh') return next('/b/dashboard');
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/role');
    }

    if (to.meta.role && authStore.role !== to.meta.role) {
        return next('/');
    }

    next();
});

export default router;
