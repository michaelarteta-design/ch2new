// import Navbar from "../components/Navbar";

import { useParams } from "react-router";
import axios from 'axios'
import { useEffect, useState } from 'react'
import baseUrl from '../constant/baseUrl'
import background from "../../assets/image.png"


export default function Detail() {
  const { id } = useParams()

  const [movie, setMovie] = useState({})
  async function fetchMovie() {
    try {
      const { data } = await axios.get(`${baseUrl}/pub/movies/${id}`)
      setMovie(data.data)
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [movie])
  return (

    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white flex justify-center items-center px-6 pt-32 pb-10"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* <Navbar /> */}

      <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-10">
        <div className="w-full max-w-6xl min-h-125 flex flex-col md:flex-row items-center gap-8 md:gap-12 rounded-xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.4)]">
          <div className="w-full md:w-1/2 shrink-0">
            <img
              src={movie.imgUrl}
              alt="Detail film"
              className="w-full h-112.5 object-cover rounded-xl"
            />
          </div>

          <div className="w-full md:flex-1 min-w-0">
            <div className="inline-block mb-4 rounded-full bg-teal-600 px-4 py-1 text-xl">
              {`rating: ${movie.rating}`}
            </div>

            <h1 className="mb-4 text-3xl md:text-3xl font-semibold leading-tight">
              {movie.title}
            </h1>

            <p className="mb-6 text-white leading-relaxed font-light text-2xl">
              {movie.synopsis}
            </p>

            <a
              href={movie.trailerUrl}
              className="inline-flex items-center gap-2 text-white font-semibold text-xl hover:underline"
            >
              Watch trailer
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}