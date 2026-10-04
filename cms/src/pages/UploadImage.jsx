import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from "axios"
import baseUrl from "../constants/baseUrl"
import { movieImage } from "../constants/apiRoutes"
import FormPage from "../components/FormPage"
import Button from "../components/Button"
import Toastify from "toastify-js"

export default function UploadImage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [isSaving, setIsSaving] = useState(false)

    async function handleUpload(e) {
        e.preventDefault()
        if (!file) {
            Toastify({
                text: "Pilih gambar terlebih dahulu",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                style: { background: "#dc2626" },
            }).showToast()
            return
        }

        if (!file.type.startsWith("image/")) {
            Toastify({
                text: "File harus berupa gambar",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                style: { background: "#dc2626" },
            }).showToast()
            return
        }
        setIsSaving(true)
        try {
            const formData = new FormData()
            formData.append("image", file)
            await axios.patch(`${baseUrl}${movieImage(id)}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            Toastify({
                text: "upload image berhasil",
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
            <form onSubmit={handleUpload} className="space-y-6">
                <h1 className="text-3xl font-medium">Upload Image</h1>
                <p className="text-gray-300">Ganti poster movie #{id}</p>
                <label htmlFor="image" className="block">Pilih gambar</label>
                <input id="image" type="file" accept="image/*" required
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full rounded-lg border border-gray-500 bg-[#0d0d0d] p-3" />
                <Button type="submit" disabled={isSaving}>{isSaving ? "Mengupload..." : "Upload Image"}</Button>
            </form>
        </FormPage>
    )
}
