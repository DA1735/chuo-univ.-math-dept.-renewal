const API_BASE_URL = 'http://localhost:3001/api';

export const fetchNews = async () => {
    const res = await fetch(`${API_BASE_URL}/news`);
    if (!res.ok) throw new Error('Failed to fetch news');
    return res.json();
};

export const fetchEncounters = async () => {
    const res = await fetch(`${API_BASE_URL}/encounters`);
    if (!res.ok) throw new Error('Failed to fetch encounters');
    return res.json();
};

export const fetchEwmSub = async () => {
    const res = await fetch(`${API_BASE_URL}/ewm-sub`);
    if (!res.ok) throw new Error('Failed to fetch ewm-sub');
    return res.json();
};

export const fetchEwmSubExtra = async () => {
    const res = await fetch(`${API_BASE_URL}/ewm-sub-extra`);
    if (!res.ok) throw new Error('Failed to fetch ewm-sub-extra');
    return res.json();
};

export const fetchStaff = async () => {
    const res = await fetch(`${API_BASE_URL}/staff`);
    if (!res.ok) throw new Error('Failed to fetch staff');
    return res.json();
};

export const fetchSeminars = async (category: string) => {
    const res = await fetch(`${API_BASE_URL}/seminars/${category}`);
    if (!res.ok) throw new Error(`Failed to fetch seminars for ${category}`);
    return res.json();
};

export const fetchEncounter = async (id: string | number) => {
    const res = await fetch(`${API_BASE_URL}/encounters/${id}`);
    if (!res.ok) throw new Error('Failed to fetch encounter');
    return res.json();
};
