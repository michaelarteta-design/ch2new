import { NavLink, useNavigate } from "react-router"

export default function Navbar() {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login", { replace: true })
    }
    return (
        <nav className="fixed top-0 left-0 w-full flex flex-wrap items-center justify-between gap-3 p-5 sm:p-8 z-10 text-white bg-linear-to-r from-[#0F0F0F] via-black/70 to-[#0D0D0D]">
            <div className="flex items-center gap-6">
                <span className="text-gray-400 text-3xl font-serif">FiFlix</span>
                <NavLink to="/" end className="text-xl font-semibold">Home</NavLink>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-lg font-semibold">
                <NavLink to="/add">Add Movie</NavLink>
                <NavLink to="/add-staff">Add Staff</NavLink>
                <button type="button" onClick={handleLogout} className="rounded-full px-3 py-1.5 hover:bg-gray-800">Logout</button>
            </div>
        </nav>
    )
}
