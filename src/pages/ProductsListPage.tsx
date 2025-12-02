import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../api/productsApi";
import {
    getLocalProducts,
    deleteLocalProduct,
} from "../utils/localProducts";

export default function ProductsListPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        setLoading(true);

        // API FakeStore
        const res = await productsApi.getAll();
        const apiProducts = res.data;

        // Local custom products
        const custom = getLocalProducts();

        // Gabungkan
        const all = [...apiProducts, ...custom];

        setProducts(all);
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (p: any) => {
        if (!window.confirm("Hapus produk ini?")) return;

        if (p.fromLocal) {
            deleteLocalProduct(p.id);
            setProducts((prev) => prev.filter((x) => x.id !== p.id));
        } else {
            // delete ke FakeStore (walaupun tidak persist)
            await productsApi.remove(p.id);
            setProducts((prev) => prev.filter((x) => x.id !== p.id));
        }
    };

    return (
        <main className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold tracking-tight">Products</h1>
                <Link
                    to="/products/new"
                    className="border border-black px-4 py-2 text-xs rounded-full hover:bg-black hover:text-white"
                >
                    + New Product
                </Link>
            </div>

            {loading ? (
                <div className="text-sm text-gray-500">Loading...</div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="border rounded-lg p-3 flex flex-col gap-2 hover:shadow-sm transition"
                        >
                            <img
                                src={p.image}
                                className="h-40 object-contain"
                                alt={p.title}
                            />

                            <div className="text-xs text-gray-500 uppercase">
                                {p.category}
                            </div>

                            <div className="text-sm line-clamp-2">{p.title}</div>

                            <div className="text-sm font-semibold">${p.price}</div>

                            <div className="flex justify-between text-xs mt-3">
                                <Link
                                    to={`/products/${p.id}/edit`}
                                    className="underline"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(p)}
                                    className="text-red-500 underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
