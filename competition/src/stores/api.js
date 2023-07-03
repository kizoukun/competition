import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token") || '',
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
})

export async function isAuthenticated() {
    try {
        const response = await axiosInstance.get('/profile');
        return response.data.success;
    } catch(err) {
        return false;
    }
}

export async function getUser() {
    try {
        const response = await axiosInstance.get('/profile');
        return response.data.data;
    } catch(err) {
        throw err;
    }
}

export async function logout() {
    axiosInstance.delete('/auth/logout')
        .then(response => {
            if(response.data.success) {
                localStorage.removeItem("token");
                window.location.reload();
            }
        })
        .catch(error => {
            console.error(error);
        });
}

export default axiosInstance;