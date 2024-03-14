import { apiUrl } from "./apiUrl";

export const makeApiRequest = async (route: string, type: string, data?: object) => {
    try {
        const response = await fetch(`${apiUrl}${route}`, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWxhbi5rcnN0aWNAZ21haWwuY29tIiwicGVybWlzc2lvbiI6ODE5MSwiaWQiOjExLCJleHAiOjE3MTA0NTI5NTcsImlhdCI6MTcxMDQyNDE1N30.3VlPgCYKToqAR22d8e-iYoayegR2-t6wud_ESa_r0bDu9rY5TpIo8sCbLbwkAEJXDL_iZmPH89XhHeit1uE8-g`

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
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWxhbi5rcnN0aWNAZ21haWwuY29tIiwicGVybWlzc2lvbiI6ODE5MSwiaWQiOjExLCJleHAiOjE3MTA0NTI5NTcsImlhdCI6MTcxMDQyNDE1N30.3VlPgCYKToqAR22d8e-iYoayegR2-t6wud_ESa_r0bDu9rY5TpIo8sCbLbwkAEJXDL_iZmPH89XhHeit1uE8-g`
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