// lib/gstApi.js
const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

const apiFetch = async (method, endpoint, { token, body, params }) => {
    // build query string from params object if provided
    let url = `${API_URL}/gst${endpoint}`;
    if (params && Object.keys(params).length > 0) {
        const query = new URLSearchParams(params).toString();
        url += `?${query}`;
    }

    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "API error");
    }

    return res.json();
};

export { apiFetch };
