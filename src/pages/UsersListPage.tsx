import { useEffect, useState } from "react";
import { usersApi, UserPayload } from "../api/usersApi";

type User = UserPayload & { id: number };

const emptyForm: UserPayload = {
    email: "",
    username: "",
    password: "",
    name: { firstname: "", lastname: "" },
    phone: "",
};

export default function UsersListPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [form, setForm] = useState<UserPayload>(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        setLoading(true);
        const res = await usersApi.getAll();
        setUsers(res.data);
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        nested?: "firstname" | "lastname"
    ) => {
        const { name, value } = e.target;
        if (nested) {
            setForm((prev) => ({
                ...prev,
                name: { ...prev.name, [nested]: value },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            await usersApi.update(editingId, form);
        } else {
            await usersApi.create(form);
        }
        setForm(emptyForm);
        setEditingId(null);
        loadUsers();
    };

    const handleEdit = (user: User) => {
        setEditingId(user.id);
        setForm({
            email: user.email,
            username: user.username,
            password: "", // kosongin aja
            name: {
                firstname: user.name.firstname,
                lastname: user.name.lastname,
            },
            phone: user.phone,
        });
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Hapus user ini?")) return;
        await usersApi.remove(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold tracking-tight">Users</h1>
            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="border rounded-lg p-4 mb-6 grid gap-3 md:grid-cols-2"
            >
                <input
                    name="email"
                    placeholder="Email"
                    className="border px-3 py-2 text-sm rounded"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    name="username"
                    placeholder="Username"
                    className="border px-3 py-2 text-sm rounded"
                    value={form.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border px-3 py-2 text-sm rounded"
                    value={form.password}
                    onChange={handleChange}
                />
                <input
                    placeholder="First name"
                    className="border px-3 py-2 text-sm rounded"
                    value={form.name.firstname}
                    onChange={(e) => handleChange(e, "firstname")}
                />
                <input
                    placeholder="Last name"
                    className="border px-3 py-2 text-sm rounded"
                    value={form.name.lastname}
                    onChange={(e) => handleChange(e, "lastname")}
                />
                <input
                    name="phone"
                    placeholder="Phone"
                    className="border px-3 py-2 text-sm rounded"
                    value={form.phone}
                    onChange={handleChange}
                />

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="border border-black px-4 py-2 text-xs rounded-full hover:bg-black hover:text-white"
                    >
                        {editingId ? "Update User" : "Add User"}
                    </button>
                </div>
            </form>

            {/* TABLE */}
            {loading ? (
                <div className="text-sm text-gray-500">Loading users...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="text-left py-2 px-2">Name</th>
                                <th className="text-left py-2 px-2">Username</th>
                                <th className="text-left py-2 px-2">Email</th>
                                <th className="text-left py-2 px-2">Phone</th>
                                <th className="text-right py-2 px-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b last:border-0">
                                    <td className="py-2 px-2">
                                        {u.name.firstname} {u.name.lastname}
                                    </td>
                                    <td className="py-2 px-2">{u.username}</td>
                                    <td className="py-2 px-2">{u.email}</td>
                                    <td className="py-2 px-2">{u.phone}</td>
                                    <td className="py-2 px-2 text-right">
                                        <button
                                            className="text-xs underline mr-3"
                                            onClick={() => handleEdit(u)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-xs text-red-500 underline"
                                            onClick={() => handleDelete(u.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-3 text-center text-xs text-gray-500"
                                    >
                                        No users.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}
