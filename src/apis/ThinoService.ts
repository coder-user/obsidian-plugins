import axios from "axios";

export interface ThinoData {
    isList: boolean;
    type: ThinoType;
    text: string;
}

export enum ThinoType {
    DAILY = 'DAILY',
    MULTI = 'MULTI',
    FILE = 'FILE',
    CANVAS = 'CANVAS'
}

export const createThinoAsync = async function (
    data: ThinoData,
    port: number = 43999,
    callback: () => void = () => {
    },
    fallback: () => void = () => {
    }
) {
    data = appendInboxTagIfAbsent(data);
    await axios.post(`http://localhost:${port}/create`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(callback).catch(fallback);
};

function appendInboxTagIfAbsent(data: ThinoData): ThinoData {
    if (!data.text.includes('#')) {
        data.text += '\n\n #inbox';
    }
    return data;
}