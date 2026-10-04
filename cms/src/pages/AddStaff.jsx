import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import baseUrl from "../constants/baseUrl"
import { registerStaff } from "../constants/apiRoutes"
import FormPage from "../components/FormPage"
import Button from "../components/Button"
import Toastify from "toastify-js"

export default function AddStaff() {
    const navigate = useNavigate()
    const [staff, setStaff] = useState({ username: "", email: "", password: ""})
    const [isSaving, setIsSaving] = useState(false)
    function handleChange(e) {
        setStaff({ ...staff, [e.target.name]: e.target.value })
    }
    async function handleAddStaff(e) {
        e.preventDefault()
        setIsSaving(true)
        try {
            await axios.post(`${baseUrl}${registerStaff}`, staff, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            Toastify({
                text: "Staff berhasil ditambahkan",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast()
            navigate("/")
        } catch (error) {
            Toastify({
                text: error.response?.data?.message || error.message,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #dc2626, #ef4444)",
                },
            }).showToast()
        } finally {
            setIsSaving(false)
        }
    }
    return (
        <FormPage>
            <form onSubmit={handleAddStaff} className="space-y-5">
                <h1 className="text-3xl font-medium">Add Staff</h1>
                <div>
                    <label htmlFor="username" className="block mb-2">Username</label>
                    <input id="username" name="username" type="text" required
                        value={staff.username} onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-500 bg-[#0d0d0d] p-3" />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input id="email" name="email" type="email" required
                        value={staff.email} onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-500 bg-[#0d0d0d] p-3" />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2">Password</label>
                    <input id="password" name="password" type="password" required
                        value={staff.password} onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-500 bg-[#0d0d0d] p-3" />
                </div>
                <Button type="submit" disabled={isSaving}>{isSaving ? "Menyimpan..." : "Add Staff"}</Button>
            </form>
        </FormPage>
    )
}
