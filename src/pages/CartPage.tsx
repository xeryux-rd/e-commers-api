import { useEffect, useState } from "react";
import { cartsApi, CartPayload } from "../api/cartsApi";

type Cart = CartPayload & { id: number };

const emptyCart: CartPayload = {
    userId: 1,
    date: new Date().toISOString().slice(0, 10),
    products: [{ productId: 1, quantity: 1 }],
};

export default function CartPage() {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [form, setForm] = useState<CartPayload>(emptyCart);
    const [loading, setLoading] = useState(true);

    const loadCarts = async () => {
        setLoading(true);
        const res = await cartsApi.getAll();
        setCarts(res.data);
        setLoading(false);
    };

    useEffect(() => {
        loadCarts();
    }, []);

    const totalItems = (cart: Cart) =>
        cart.products.reduce((sum, p) => sum + p.quantity, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await cartsApi.create(form);
        setForm(emptyCart);
        loadCarts();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Hapus cart ini?")) return;
        await cartsApi.remove(id);
        setCarts((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-xl font-semibold tracking-tight mb-4">Carts</h1>

            {/* FORM SEDERHANA */}
            <form
                onSubmit={handleSubmit}
                className="border rounded-lg p-4 mb-6 flex flex-wrap gap-3 items-end"
            >
                <div>
                    <label className="block text-xs mb-1">User ID</label>
                    <input
                        type="number"
                        className="border px-3 py-2 text-sm rounded w-32"
                        value={form.userId}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                userId: Number(e.target.value),
                            }))
                        }
                    />
                </div>

                <div>
                    <label className="block text-xs mb-1">Date</label>
                    <input
                        type="date"
                        className="border px-3 py-2 text-sm rounded"
                        value={form.date}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                date: e.target.value,
                            }))
                        }
                    />
                </div>

                <div>
                    <label className="block text-xs mb-1">Product ID</label>
                    <input
                        type="number"
                        className="border px-3 py-2 text-sm rounded w-32"
                        value={form.products[0].productId}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                products: [
                                    {
                                        ...prev.products[0],
                                        productId: Number(e.target.value),
                                    },
                                ],
                            }))
                        }
                    />
                </div>

                <div>
                    <label className="block text-xs mb-1">Qty</label>
                    <input
                        type="number"
                        className="border px-3 py-2 text-sm rounded w-24"
                        value={form.products[0].quantity}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                products: [
                                    {
                                        ...prev.products[0],
                                        quantity: Number(e.target.value),
                                    },
                                ],
                            }))
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="border border-black px-4 py-2 text-xs rounded-full hover:bg-black hover:text-white"
                >
                    Add Cart
                </button>
            </form>

            {/* LIST CART */}
            {loading ? (
                <div className="text-sm text-gray-500">Loading carts...</div>
            ) : (
                <div className="space-y-3">
                    {carts.map((c) => (
                        <div
                            key={c.id}
                            className="border rounded-lg px-4 py-3 flex justify-between items-center"
                        >
                            <div>
                                <div className="text-sm font-medium">
                                    Cart #{c.id} • User {c.userId}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {new Date(c.date).toLocaleDateString()} • {totalItems(c)} items
                                </div>
                            </div>
                            <button
                                className="text-xs text-red-500 underline"
                                onClick={() => handleDelete(c.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {carts.length === 0 && (
                        <div className="text-xs text-gray-500">No carts.</div>
                    )}
                </div>
            )}
        </main>
    );
}
