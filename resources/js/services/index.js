import client from './client';

export default async function call (method, url, data = {}) {
    return  await client[method](url, data);
}