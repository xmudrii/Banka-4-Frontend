import { apiUrl } from "./apiUrl";

export const makeApiRequest = async (route: string, type: string, data?: object) => {
    try {
        const response = await fetch(`${apiUrl}${route}`, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWxhbi5rcnN0aWNAZ21haWwuY29tIiwicGVybWlzc2lvbiI6ODE5MSwiaWQiOjExLCJleHAiOjE3MTA0NTQxOTQsImlhdCI6MTcxMDQyNTM5NH0.3PmmMcFe4aw1n1jXxsK_wX_dnYZOkZZvFFHy92ze_EcnaaVi1uSdx1RJjKJnWTm7l30BsNtbIFxzUBEQR7LeMA
                `

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
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWxhbi5rcnN0aWNAZ21haWwuY29tIiwicGVybWlzc2lvbiI6ODE5MSwiaWQiOjExLCJleHAiOjE3MTA0NTQxOTQsImlhdCI6MTcxMDQyNTM5NH0.3PmmMcFe4aw1n1jXxsK_wX_dnYZOkZZvFFHy92ze_EcnaaVi1uSdx1RJjKJnWTm7l30BsNtbIFxzUBEQR7LeMA
                `
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