import { jwtDecode } from 'jwt-decode';

// const token = localStorage.getItem('token');
type Decoded = {
    permission: number;
    id: number;
}
export const getMe = () => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXJhQGdtYWlsLnJzIiwicGVybWlzc2lvbiI6NDE5NDMwMywiaWQiOjEsImV4cCI6MTcxMDQ3MTA1OSwiaWF0IjoxNzEwNDQyMjU5fQ.m96qgWQVSfHkjTWLNdwqjt3sH9UCNICiCxWI6w0FPbyS5buoILVBy06LuReLO1V9SoUDZVk1wXkRQOKbzOihRg'

    try {
        const decoded: Decoded = jwtDecode(token);
        if (decoded && decoded.permission && decoded.id) {
            return { permission: decoded.permission, id: decoded.id }
        }
    } catch (error) {
        console.error('Error decoding token:', error);
    }
};

