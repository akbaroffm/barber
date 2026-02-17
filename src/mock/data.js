export const mockBarbers = [
    {
        id: '1',
        name: 'Aziz Sartarosh',
        rating: 4.8,
        distance: '1.2 km',
        minPrice: 50000,
        address: 'Toshkent, Chilonzor 4-kvartal',
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=400&fit=crop',
        portfolio: [
            'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400',
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400'
        ],
        services: [
            { id: 's1', name: 'Soch olish', price: 50000, duration: 30 },
            { id: 's2', name: 'Soch + Soqol', price: 80000, duration: 50 },
            { id: 's3', name: 'Bolalar uchun soch olish', price: 40000, duration: 40 }
        ],
        reviews: [
            { id: 'r1', user: 'Jasur', text: 'Juda yaxshi xizmat, tavsiya qilaman!', rating: 5 },
            { id: 'r2', user: 'Olim', text: 'Usta o‘z ishining ustasi.', rating: 4 }
        ]
    },
    {
        id: '2',
        name: 'Sirojiddin Style',
        rating: 4.9,
        distance: '0.8 km',
        minPrice: 60000,
        address: 'Toshkent, Yunusobod 19-kvartal',
        image: 'https://images.unsplash.com/photo-1592647425447-182564215944?w=400&h=400&fit=crop',
        portfolio: [
            'https://images.unsplash.com/photo-1536520002442-39764a41e987?w=400'
        ],
        services: [
            { id: 's4', name: 'Kreativ soch olish', price: 70000, duration: 45 },
            { id: 's5', name: 'Styling', price: 30000, duration: 20 }
        ],
        reviews: []
    }
];

export const mockNotifications = [
    { id: 1, title: 'Xush kelibsiz!', message: 'Barber App ga xush kelibsiz!', time: new Date().toISOString(), type: 'info' }
];

export const mockSchedule = {
    monday: { start: '09:00', end: '20:00', active: true },
    tuesday: { start: '09:00', end: '20:00', active: true },
    wednesday: { start: '09:00', end: '20:00', active: true },
    thursday: { start: '09:00', end: '20:00', active: true },
    friday: { start: '09:00', end: '20:00', active: true },
    saturday: { start: '10:00', end: '18:00', active: true },
    sunday: { start: '00:00', end: '00:00', active: false }
};
