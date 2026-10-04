// import Navbar from "../components/Navbar";
import axios from 'axios'
import { useEffect, useState } from 'react'
import baseUrl from '../constant/baseUrl'
import Card from '../components/Card'
import background from "../../assets/image.png"

export default function Home() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState("")
    const [sort, setSort] = useState("")
    const pagination = generatePages()

    function generatePages() {
        let result = []
        for (let i = 1; i <= totalPage; i++) {
            result.push(i)
        }
        return result
    }

    async function handleSearch(e) {
        e.preventDefault()
        // Reset ke halaman 1 setiap kali melakukan search baru
        setCurrentPage(1)
        fetchMovies()
    }

    async function fetchMovies() {
        try {
            const { data } = await axios.get(`${baseUrl}/pub/movies`, {
                params: {
                    search,
                    page: currentPage,
                    filter: filter || undefined,
                    sort: sort || undefined,
                },
            })
            setMovies(data.movies)
            setCurrentPage(Number(data.meta.page))
            setTotalPage(Number(data.meta.totalPage))
            console.log(data);
            console.log(data.meta);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [currentPage, sort, filter])

    return (
        /* Pembungkus Utama: menggunakan flex-col agar layout tersusun dari atas ke bawah */
        <div
            className="min-h-screen bg-cover bg-center bg-fixed text-white flex flex-col pt-36 pb-10 px-6 md:px-16"
            style={{ backgroundImage: `url(${background})` }}
        >
            {/* <Navbar /> */}

            <div className="max-w-7xl mx-auto w-full">
                {/* 1. SECTION FILTER & SEARCH */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    {/* Select Filter & Sort */}
                    <div className="flex gap-4 w-full md:w-auto">
                        <select
                            aria-label="Genres"
                            value={filter}
                            onChange={(e) => {
                                setFilter(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="bg-[#0c0c0c] text-white border border-gray-500 rounded-full px-5 py-3 focus:outline-none"
                        >
                            <option value="">Semua genre</option>
                            <option value="1">Science Fiction</option>
                            <option value="2">Action</option>
                            <option value="3">Drama</option>
                            <option value="4">History</option>
                            <option value="5">Comedy</option>
                        </select>

                        <select
                            aria-label="Urutan film"
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="bg-[#0c0c0c] text-white border border-gray-500 rounded-full px-5 py-3 focus:outline-none"
                        >
                            <option value="">Urutan default</option>
                            <option value="title">Judul A–Z</option>
                        </select>
                    </div>

                    {/* Form Search */}
                    <form className="w-full md:w-80" onSubmit={handleSearch}>
                        <label
                            htmlFor="search"
                            className="sr-only"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth={2}
                                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="search"
                                className="block w-full p-3 ps-9 pr-20 bg-transparent border-2 border-white text-white text-sm rounded-full placeholder:text-gray-300 focus:outline-none"
                                placeholder="search by title"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute end-1.5 bottom-1.5 text-white bg-black hover:bg-gray-700 font-semibold rounded-full text-sm px-4 py-1.5 focus:outline-none"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* 2. SECTION GRID MOVIES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {movies.map((movie) => {
                        return <Card movies={movie} key={movie.id} />
                    })}
                </div>

                {/* 3. SECTION PAGINATION */}
                <div className="flex justify-center items-center gap-3">
                    <button
                        type="button"
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-4 py-2 rounded-lg bg-[#0d0d0d] text-white border border-gray-600 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Prev
                    </button>

                    {pagination.map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            aria-current={page === currentPage ? "page" : undefined}
                            className={`px-4 py-2 rounded-lg text-white border border-gray-600 ${
                                page === currentPage
                                    ? "bg-gray-600 font-bold"
                                    : "bg-[#0d0d0d] hover:bg-gray-700"
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        disabled={currentPage >= totalPage}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-4 py-2 rounded-lg bg-[#0d0d0d] text-white border border-gray-600 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}