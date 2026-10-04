import { useState, useEffect } from "react"
import axios from 'axios'
import baseUrl from "../constants/baseUrl"
import { useNavigate } from "react-router"
import background from "../../assets/image.png"

export default function MovieList() {
    const [movies, setMovies] = useState([])
    const navigate = useNavigate()
    async function fetchMovies() {
        try {
            const { data } = await axios.get(`${baseUrl}/movies`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            console.log(data)
            setMovies(data.data)
        } catch (error) {
            console.log(error);
        }
    }
    async function handleDelete(id) {
        if (!window.confirm("Yakin ingin menghapus film ini?")) return

        try {
            await axios.delete(`${baseUrl}/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            setMovies((prevMovies) =>
                prevMovies.filter((movie) => movie.id !== id)
            )
        } catch (error) {
            console.error(error.response?.data || error.message)
        }
    }
    useEffect(() => {
        fetchMovies()
    }, [])


    return (
        <div
            className="min-h-screen bg-cover bg-center bg-fixed text-white flex justify-center items-center px-6 pt-32 pb-10"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="w-full max-w-6xl bg-black/40 rounded-xl p-6 sm:p-10 shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <h1 className="text-3xl font-semibold mb-6">
                    Movie List
                </h1>

                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-4">Poster</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Rating</th>
                                <th className="p-4">Trailer</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {movies.map((movie) => (
                                <tr
                                    key={movie.id}
                                    className="border-b border-gray-700"
                                >
                                    <td className="p-4">
                                        <img
                                            src={movie.imgUrl}
                                            alt={movie.title}
                                            className="w-16 h-24 min-w-16 object-cover rounded-lg"
                                        />
                                    </td>

                                    <td className="p-4 font-semibold">
                                        {movie.title}
                                    </td>

                                    <td className="p-4">{movie.rating}</td>

                                    <td className="p-4">
                                        <a
                                            href={movie.trailerUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="whitespace-nowrap hover:underline"
                                        >
                                            Watch Trailer
                                        </a>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/edit/${movie.id}`)}
                                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(movie.id)}
                                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                            <button type="button" onClick={() => navigate(`/upload/${movie.id}`)}
                                                className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500">
                                                Upload Image
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}