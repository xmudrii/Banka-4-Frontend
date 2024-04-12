export const getApiUrl = (route: string) => {
    const koisnikRoutes = [
        '/omiljeni-korisnik',
        '/radnik',
        '/korisnik',
        '/validate-otp',
        '/generate-otp'
    ]
    const bankaRoutes = [
        '/transaction',
        '/exchange',
        '/credit',
        '/cards',
        '/racuni'
    ]
    const isKoisnikRoute = koisnikRoutes.some(prefix => route.startsWith(prefix));
    if (isKoisnikRoute) {
        return 'user-service:8080/api'
    }
    const isBankaRoute = bankaRoutes.some(prefix => route.startsWith(prefix));
    if (isBankaRoute) {
        return 'banka-service:8082/api'
    }
    return 'berza-service:8081/api'
}