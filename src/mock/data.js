export const mockBarbers = [
    {
        id: '1',
        name: 'Aziz Sartarosh',
        rating: 4.8,
        reviewCount: 124,
        distance: '1.2 km',
        minPrice: 50000,
        address: 'Toshkent, Shayxontohur tumani',
        phone: "+998 90 123 45 67",
        location: { lat: 41.3111, lng: 69.2406 },
        workHours: '09:00 – 20:00',
        isOpen: true,
        about: "Aziz Sartarosh — Toshkentda yuqori sifatli soch olish xizmati. Zamonaviy asbob-uskunalar va tajribali ustalar bilan xizmatdamiz. Erkaklar va bolalar uchun soch olish, soqol qirish, styling va boshqa xizmatlar mavjud.",
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=500&fit=crop',
        cover: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=500&fit=crop',
        portfolio: [
            'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400',
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
            'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400'
        ],
        certificates: [
            'https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=400',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400'
        ],
        services: [
            { id: 's1', name: 'Soch olish', desc: 'Professional usta tomonidan zamonaviy uslubda soch olish.', price: 50000, duration: 30, category: 'Erkaklar', image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=200&h=200&fit=crop' },
            { id: 's2', name: 'Soch + Soqol', desc: "Soch olish va soqolni professional tarzda shakllantirish.", price: 80000, duration: 50, category: 'Erkaklar', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop' },
            { id: 's3', name: 'Soch boyash', desc: "Professional bo'yoqlar bilan soch rangini o'zgartirish.", price: 120000, duration: 60, category: 'Ayollar', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop' },
            { id: 's6', name: 'Soqol qirish', desc: "An'anaviy uslubda soqolni shakllantirish va qirish.", price: 30000, duration: 20, category: 'Erkaklar', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&h=200&fit=crop' },
            { id: 's11', name: 'Bolalar soch olish', desc: "Bolalar uchun maxsus qirqim.", price: 35000, duration: 25, category: 'Bolalar', image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=200&h=200&fit=crop' }
        ],
        reviews: [
            { id: 'r1', user: 'Jasur M.', text: 'Juda yaxshi xizmat, tavsiya qilaman! Har doim shu yerga kelaman.', rating: 5, date: '12 Fev 2026' },
            { id: 'r2', user: 'Olim K.', text: "Usta o'z ishining ustasi. Professional va toza.", rating: 4, date: '30 Yan 2026' },
            { id: 'r3', user: 'Sardor A.', text: "Bolam uchun juda yaxshi oldi, yig'lamadi ham.", rating: 5, date: '21 Yan 2026' }
        ]
    },
    {
        id: '2',
        name: 'Sirojiddin Style',
        rating: 4.9,
        reviewCount: 89,
        distance: '0.8 km',
        minPrice: 60000,
        address: 'Toshkent, Yunusobod tumani',
        phone: "+998 90 987 65 43",
        location: { lat: 41.3333, lng: 69.2667 },
        workHours: '10:00 – 21:00',
        isOpen: true,
        about: "Sirojiddin Style — zamonaviy erkaklar soch turmagi. Kreativ va klassik soch olish xizmatlari, styling va boshqalar.",
        image: 'https://images.unsplash.com/photo-1592647425447-182564215944?w=800&h=500&fit=crop',
        cover: 'https://images.unsplash.com/photo-1592647425447-182564215944?w=800&h=500&fit=crop',
        portfolio: [
            'https://images.unsplash.com/photo-1536520002442-39764a41e987?w=400',
            'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400'
        ],
        certificates: [
            'https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=400'
        ],
        services: [
            { id: 's4', name: 'Kreativ soch olish', desc: "Zamonaviy va kreativ uslubda soch shakllantirish.", price: 70000, duration: 45, image: 'https://images.unsplash.com/photo-1536520002442-39764a41e987?w=200&h=200&fit=crop' },
            { id: 's5', name: 'Styling', desc: "Professional styling va soch modellash.", price: 30000, duration: 20, image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&h=200&fit=crop' }
        ],
        reviews: [
            { id: 'r4', user: 'Bekzod R.', text: "Eng yaxshi sartaroshxonalardan biri Toshkentda!", rating: 5, date: '17 Sen 2025' }
        ]
    },
    {
        id: '3',
        name: 'Royal Barber',
        rating: 4.6,
        reviewCount: 56,
        distance: '2.1 km',
        minPrice: 45000,
        address: 'Toshkent, Mirzo Ulug\'bek tumani',
        phone: "+998 94 555 11 22",
        location: { lat: 41.3100, lng: 69.3200 },
        workHours: '08:00 – 19:00',
        isOpen: false,
        about: "Royal Barber — qulay narxlarda sifatli xizmat. Har bir mijozga individual yondashuv.",
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=500&fit=crop',
        cover: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=500&fit=crop',
        portfolio: [
            'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400'
        ],
        certificates: [],
        services: [
            { id: 's7', name: 'Soch olish', desc: "Klassik va zamonaviy uslubda.", price: 45000, duration: 30, image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=200&h=200&fit=crop' },
            { id: 's8', name: 'Yuz parvarishi', desc: "Yuz tozalash va parvarish qilish.", price: 60000, duration: 40, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop' }
        ],
        reviews: [
            { id: 'r5', user: 'Nodir T.', text: "Narx va sifat mos. Yaxshi joy.", rating: 4, date: '5 Dek 2025' }
        ]
    },
    {
        id: '4',
        name: 'Gentleman Club',
        rating: 4.7,
        reviewCount: 203,
        distance: '3.5 km',
        minPrice: 70000,
        address: "Toshkent, Mirobod tumani",
        phone: "+998 99 333 44 55",
        location: { lat: 41.2980, lng: 69.2640 },
        workHours: '10:00 – 22:00',
        isOpen: true,
        about: "Gentleman Club — premium sartaroshxona. Yuqori sifatli xizmat va dam olish muhiti.",
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=500&fit=crop',
        cover: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=500&fit=crop',
        portfolio: [
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
            'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
            'https://images.unsplash.com/photo-1536520002442-39764a41e987?w=400'
        ],
        certificates: [
            'https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=400'
        ],
        services: [
            { id: 's9', name: 'Premium soch olish', desc: "VIP xizmat — pul tejash uchun emas.", price: 100000, duration: 45, image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop' },
            { id: 's10', name: 'Soqol modellash', desc: "Soqolni shaklga keltirish va parvarish.", price: 70000, duration: 35, image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&h=200&fit=crop' }
        ],
        reviews: [
            { id: 'r6', user: 'Sherzod B.', text: "Premium xizmat! Tavsiya qilaman.", rating: 5, date: '8 Fev 2026' },
            { id: 'r7', user: 'Farrux N.', text: "Eng yaxshi joy, atmosfera ajoyib.", rating: 5, date: '1 Fev 2026' }
        ]
    }
];

export const mockNotifications = [
    { id: 1, title: 'Xush kelibsiz!', message: 'Barber App ga xush kelibsiz!', time: new Date().toISOString(), type: 'info', read: false }
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
