// INI BUAT SIMPAN PRODUK CUSTOM FRONTEND-ONLY (PERSIST DI LOCAL STORAGE)

const KEY = "custom_products";

export function getLocalProducts() {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
}

export function saveLocalProduct(product: any) {
    const items = getLocalProducts();
    const updated = [...items, product];
    localStorage.setItem(KEY, JSON.stringify(updated));
}

export function updateLocalProduct(id: number, newData: any) {
    const items = getLocalProducts();
    const updated = items.map((p: any) => (p.id === id ? newData : p));
    localStorage.setItem(KEY, JSON.stringify(updated));
}

export function deleteLocalProduct(id: number) {
    const items = getLocalProducts();
    const updated = items.filter((p: any) => p.id !== id);
    localStorage.setItem(KEY, JSON.stringify(updated));
}
