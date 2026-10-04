import { Link } from "react-router";

export default function Card({movies}) {
    return (
        <>
            <Link to={`/detail/${movies.id}`} className="cursor-pointer group relative flex flex-col my-6 bg-[#0d0d0d] shadow-sm rounded-lg w-75 hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                    <img
                        className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
                        src={movies.imgUrl}
                        alt="investment-seed-round"
                    />
                </div>
                <div className="p-1">
                    <h6 className="mb-0 text-slate-300 text-xl font-semibold">
                        {movies.title}
                    </h6>
                    <p className="text-slate-400 leading-normal font-light">
                        {movies.synopsis}
                    </p>
                    <p className="text-slate-400 leading-normal font-light">
                        {`rating: ${movies.rating}`}
                    </p>
                </div>
            </Link>
        </>
    )
}