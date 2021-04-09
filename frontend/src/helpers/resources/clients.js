import { apiURL } from "../../config"

const baseUrl =  `${apiURL}/client`;

export const getClients = async () => {
    const resp = await fetch(baseUrl);
    const data = await resp.json();
    return data;
}

export const storeClient = async (client) => {
    const resp = await fetch(baseUrl,{
        method: "POST",
        body: JSON.stringify(client),
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
    });

    const data = await resp.json();
    return data;
}

export const updateClient = async (document,client) => {
    try {
        let res = await fetch(`${baseUrl}/${document}`,{
            method: "PUT",
            body: JSON.stringify(client),
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
              },
        });
        let data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const destroyClient = async (document) => {
    try {
        let res = await fetch(`${baseUrl}/${document}`, {
            method: "DELETE",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const find = async (document) => {
    try {
        let res = await fetch(`${baseUrl}/${document}`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const searchClient = async (string) => {
    try {
        const resp = await fetch(`${apiURL}/client-search/`,{
            method: "POST",
            body: JSON.stringify(string),
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
              },
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
