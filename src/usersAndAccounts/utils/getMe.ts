import { jwtDecode } from 'jwt-decode';

// const token = localStorage.getItem('token');
type Decoded = {
    permission: number;
    id: number;
}
export const getMe = () => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWxhbi5rcnN0aWNAZ21haWwuY29tIiwicGVybWlzc2lvbiI6ODE5MSwiaWQiOjExLCJleHAiOjE3MTA0NDU5NTIsImlhdCI6MTcxMDQxNzE1Mn0.TyfuP9lAVdIUoAVBgaGpbGk-zodjP9P8JSLk_CXCkhVnqRuIbnCkHGas798VDOVPEijW_8KsKNRGRwNQLp-QAQ'

    try {
        const decoded: Decoded = jwtDecode(token);
        if (decoded && decoded.permission && decoded.id) {
            return { permission: decoded.permission, id: decoded.id }
        }
    } catch (error) {
        console.error('Error decoding token:', error);
    }
};

