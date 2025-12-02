import axiosClient from "./axiosClient";

export const productsApi = {
    getAll() {
        return axiosClient.get("/products");
    },
    get(id: number) {
        return axiosClient.get(`/products/${id}`);
    },
    create(data: any) {
        return axiosClient.post("/products", data);
    },
    update(id: number, data: any) {
        return axiosClient.put(`/products/${id}`, data);
    },
    remove(id: number) {
        return axiosClient.delete(`/products/${id}`);
    },
};
