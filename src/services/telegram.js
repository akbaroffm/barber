const WebApp = window.Telegram?.WebApp;

export const telegram = {
    ready: () => WebApp?.ready(),
    expand: () => WebApp?.expand(),
    close: () => WebApp?.close(),
    
    themeParams: WebApp?.themeParams || {},
    isDarkMode: WebApp?.colorScheme === 'dark',
    
    MainButton: WebApp?.MainButton,
    BackButton: WebApp?.BackButton,
    HapticFeedback: WebApp?.HapticFeedback,
    
    showPopup: (params) => WebApp?.showPopup(params),
    showAlert: (message) => WebApp?.showAlert(message),
    showConfirm: (message, callback) => WebApp?.showConfirm(message, callback),
    
    setHeaderColor: (color) => WebApp?.setHeaderColor(color),
    setBackgroundColor: (color) => WebApp?.setBackgroundColor(color),
    
    initData: WebApp?.initData || '',
    initDataUnsafe: WebApp?.initDataUnsafe || {},
    
    user: WebApp?.initDataUnsafe?.user || {
        id: 0,
        first_name: 'Mijoz',
        last_name: '',
        username: 'mijoz'
    }
};

export default telegram;
