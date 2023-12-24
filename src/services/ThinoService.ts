import axios from "axios";

export interface ThinoData {
    isList: boolean;
    type: ThinoType;
    text: string;
}

export enum ThinoType {
    FILE = 'FILE',
    DAILY = 'DAILY',
    MULTI = 'MULTI',
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
    if (data.type === ThinoType.FILE) {
        data = appendInboxTagIfAbsent(data);
    }
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