import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from "axios"
import baseUrl from "../constants/baseUrl"
import { movieDetail } from "../constants/apiRoutes"
import From from "../components/From"
import FormPage from "../components/FormPage"
import Toastify from "toastify-js"

export default function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        let active = true
        async function fetchMovie() {
            try {
                const { data } = await axios.get(`${baseUrl}${movieDetail(id)}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                })
                const result = data.data
                if (!result || !result.title) throw new Error("Data detail movie tidak ditemukan")
                if (active) setMovie({
                    title: result.title, genreId: result.genreId ?? "", rating: result.rating ?? "",
                    imgUrl: result.imgUrl ?? "", trailerUrl: result.trailerUrl ?? "", synopsis: result.synopsis ?? "",
                })
            } catch (error) {
                if (active) setErrorMessage(error.response?.data?.message || error.message)
            }
        }
        fetchMovie()
        return () => { active = false }
    }, [id])

    async function handleEdit(e) {
        e.preventDefault()
        setIsSaving(true)
        try {
            await axios.put(`${baseUrl}/movies/${id}`, {
                ...movie, genreId: Number(movie.genreId), rating: Number(movie.rating),
            }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            Toastify({
                text: "Movie berhasil diedit",
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
            {errorMessage ? <p role="alert" className="text-red-300">{errorMessage}</p>
                : !movie ? <p>Memuat movie...</p>
                    : <From movie={movie} setMovie={setMovie} onSubmit={handleEdit} isSaving={isSaving} isEdit />}
        </FormPage>
    )
}
