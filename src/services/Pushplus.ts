import axios from 'axios';

const token = '60810d9d4fed48809a6d4d8d9aec8cda';

export interface PushPlusData {
    title: string;
    content: string;
    template?: string; // 可选字段
}

export const createPushPlusAsync = async function (
    data: PushPlusData,
    callback: () => void = () => {},
    fallback: () => void = () => {}
) {
    const url = 'https://www.pushplus.plus/send';
    const postData = {
        token: token,
        title: data.title,
        content: data.content,
        template: data.template || 'markdown' // 如果未提供 template，则默认为 'markdown'
    };

    await axios.post(url, postData)
        .then(callback)
        .catch(fallback);
}
