import axiosClient from "./axiosClient";

export const authApi = {
    login(username: string, password: string) {
        return axiosClient.post("/auth/login", { username, password });
    },
};
