import { NavLink } from "react-router";

export default function Navbar() {

  // const [search, setSearch] = useState("")
  return (

    <>
      <nav className="fixed top-0 left-0 w-full flex items-center text-sm justify-between p-8 fixed z-10 bg-linear-to-r from-[#0F0F0F] from-10% via-transparent via-30% to-[#0D0D0D] to-90%">
        <div>
          <a className="text-gray-400 text-3xl font-serif transition-colors">
            FiFlix
          </a>
          <NavLink to="/" className="text-white text-xl font-semibold px-6">
            <span>Home</span>
          </NavLink>
        </div>
        <div className="flex justify-around px-10">
          
          <button className="flex items-center space-x-2 text-white hover:text-white bg-transparent hover:bg-gray-800 border border-transparent hover:border-gray-700 px-3 py-1.5 rounded-full text-xl font-semibold transition-all">
            <span>Account</span>
          </button>
        </div>
      </nav>
    </>
  )
}