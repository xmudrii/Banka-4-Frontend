import { apiUrl } from "./apiUrl";

export const makeApiRequest = async (route: string, type: string, data?: object) => {
    try {
        const response = await fetch(`${apiUrl}${route}`, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXJhQGdtYWlsLnJzIiwicGVybWlzc2lvbiI6NDE5NDMwMywiaWQiOjEsImV4cCI6MTcxMDQ3MTA1OSwiaWF0IjoxNzEwNDQyMjU5fQ.m96qgWQVSfHkjTWLNdwqjt3sH9UCNICiCxWI6w0FPbyS5buoILVBy06LuReLO1V9SoUDZVk1wXkRQOKbzOihRg`

            },
            body: JSON.stringify(data)
        });
        // console.log(response)

        // console.log(await response.json())

        if (!response.ok) {
            throw new Error('Error goes errrrr');
        }
        console.log('Big YAY');
    } catch (error) {
        console.error('BIG SAD:', error);
    }
}


export const makeGetRequest = async (route: string) => {
    try {
        const response = await fetch(`${apiUrl}${route}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXJhQGdtYWlsLnJzIiwicGVybWlzc2lvbiI6NDE5NDMwMywiaWQiOjEsImV4cCI6MTcxMDQ3MTA1OSwiaWF0IjoxNzEwNDQyMjU5fQ.m96qgWQVSfHkjTWLNdwqjt3sH9UCNICiCxWI6w0FPbyS5buoILVBy06LuReLO1V9SoUDZVk1wXkRQOKbzOihRg`
            },

        });
        if (!response.ok) {
            throw new Error('Error goes errrrr');
        }
        return await response.json()
    } catch (error) {
        console.error('BIG SAD:', error);
    }
}