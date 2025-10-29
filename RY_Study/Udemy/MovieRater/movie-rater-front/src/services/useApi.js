import { useState } from "react";
import { useCookies } from "react-cookie";
const API_URL = 'http://127.0.0.1:8000';

const useApi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(['mr-token']);

    // Основна функція для запиту
    const request = async ({
        url,
        method = 'GET',
        body = null,
        headers = {},
        auth = true,
        fullUrl = false,
    }) => {
        setLoading(true);
        setError(null);

        try {
            const fetchHeaders = {
                'Content-Type': 'application/json',
                ...headers,
            };
            if (auth && cookies['mr-token']) {
                fetchHeaders['Authorization'] = `Token ${cookies['mr-token']}`;
            }

            const response = await fetch(
                fullUrl ? url : `${API_URL}${url}`,
                {
                    method,
                    headers: fetchHeaders,
                    body: body ? JSON.stringify(body) : null,
                }
            );

            if (response.status === 204) {
                setData(true); // Наприклад, для DELETE
                return true;
            }

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || 'Error');
            }

            setData(result);
            console.log(result);
            return result;
        } catch (err) {
            setError(err.message);
            setData(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, request };
};

export default useApi;