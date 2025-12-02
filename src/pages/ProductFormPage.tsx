import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productsApi } from "../api/productsApi";
import {
    saveLocalProduct,
    getLocalProducts,
    updateLocalProduct,
} from "../utils/localProducts";

type ProductForm = {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
};

const emptyForm: ProductForm = {
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
};

export default function ProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [form, setForm] = useState<ProductForm>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [isLocal, setIsLocal] = useState(false); // local product?

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((p) => ({
            ...p,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    // handle load data
    useEffect(() => {
        if (!isEdit) return;

        const local = getLocalProducts().find(
            (x: any) => x.id === Number(id)
        );

        if (local) {
            setForm(local);
            setIsLocal(true);
            return;
        }

        const load = async () => {
            setLoading(true);
            const res = await productsApi.get(Number(id));
            setForm(res.data);
            setLoading(false);
        };

        load();
    }, [id, isEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // CREATE (local)
        if (!isEdit) {
            const newProduct = {
                ...form,
                id: Date.now(),
                fromLocal: true,
            };

            saveLocalProduct(newProduct);
            navigate("/products");
            return;
        }

        // UPDATE local
        if (isLocal) {
            updateLocalProduct(Number(id), { ...form, id: Number(id), fromLocal: true });
            navigate("/products");
            return;
        }

        // UPDATE FakeStore (tidak persist)
        await productsApi.update(Number(id), form);
        navigate("/products");
    };

    return (
        <main className="max-w-lg mx-auto px-4 py-6">
            <h1 className="text-xl font-semibold mb-4">
                {isEdit ? "Edit Product" : "New Product"}
            </h1>

            {loading ? (
                <div className="text-sm text-gray-500">Loading...</div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="border rounded-lg p-4 space-y-3"
                >
                    <input
                        name="title"
                        placeholder="Title"
                        className="border px-3 py-2 rounded text-sm w-full"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        className="border px-3 py-2 rounded text-sm w-full"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        className="border px-3 py-2 rounded text-sm w-full"
                        value={form.category}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="image"
                        placeholder="Image URL"
                        className="border px-3 py-2 rounded text-sm w-full"
                        value={form.image}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        className="border px-3 py-2 rounded text-sm w-full min-h-[80px]"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={() => navigate("/products")}
                            type="button"
                            className="border px-4 py-2 rounded-full text-xs"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="border border-black px-4 py-2 rounded-full text-xs hover:bg-black hover:text-white"
                        >
                            {isEdit ? "Save Changes" : "Create Product"}
                        </button>
                    </div>
                </form>
            )}
        </main>
    );
}
