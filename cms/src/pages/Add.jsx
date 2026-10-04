import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import baseUrl from "../constants/baseUrl"
import From from "../components/From"
import FormPage from "../components/FormPage"
import Toastify from "toastify-js"

export default function Add() {
    const navigate = useNavigate()
    const [movie, setMovie] = useState({ title: "", genreId: "", rating: "", imgUrl: "", trailerUrl: "", synopsis: "" })
    const [isSaving, setIsSaving] = useState(false)

    async function handleAdd(e) {
        e.preventDefault()
        setIsSaving(true)
        try {
            await axios.post(`${baseUrl}/movies`, {
                ...movie, genreId: Number(movie.genreId), rating: Number(movie.rating),
            }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            Toastify({
                text: "Movie berhasil ditambahkan",
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
            <From movie={movie} setMovie={setMovie} onSubmit={handleAdd} isSaving={isSaving} />
        </FormPage>
    )
}
