import axiosClient from "./axiosClient";

export interface CartPayload {
    userId: number;
    date: string;
    products: {
        productId: number;
        quantity: number;
    }[];
}

export const cartsApi = {
    getAll() {
        return axiosClient.get("/carts");
    },
    get(id: number) {
        return axiosClient.get(`/carts/${id}`);
    },
    create(data: CartPayload) {
        return axiosClient.post("/carts", data);
    },
    update(id: number, data: Partial<CartPayload>) {
        return axiosClient.put(`/carts/${id}`, data);
    },
    remove(id: number) {
        return axiosClient.delete(`/carts/${id}`);
    },
};
