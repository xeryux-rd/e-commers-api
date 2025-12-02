import axiosClient from "./axiosClient";

export interface UserPayload {
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    phone: string;
}

export const usersApi = {
    getAll() {
        return axiosClient.get("/users");
    },
    get(id: number) {
        return axiosClient.get(`/users/${id}`);
    },
    create(data: UserPayload) {
        return axiosClient.post("/users", data);
    },
    update(id: number, data: Partial<UserPayload>) {
        return axiosClient.put(`/users/${id}`, data);
    },
    remove(id: number) {
        return axiosClient.delete(`/users/${id}`);
    },
};
