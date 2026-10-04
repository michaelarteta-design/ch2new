import { useState } from "react"
import axios from "axios"
import baseUrl from "../constants/baseUrl"
import background from "../../assets/image.png"
import { useNavigate } from "react-router"
import Toastify from 'toastify-js'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/users/login`, { email, password })
            console.log(data);
            localStorage.setItem("token", data.access_token)
            Toastify({
                text: "succed login",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            navigate('/')
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #dc2626, #ef4444)",
                },
            }).showToast()
        }
    }
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center p-6 text-white"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="w-full max-w-2xl bg-black/40 rounded-xl p-8 sm:p-14 shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <form onSubmit={handleLogin} className="space-y-6">
                    <h1 className="text-3xl font-medium">
                        Login to our platform
                    </h1>

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-lg font-medium"
                        >
                            Your email
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@mail.com"
                            required
                            className="block w-full rounded-lg border border-gray-500 bg-[#0d0d0d] p-3 text-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-lg font-medium"
                        >
                            Your password
                        </label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="block w-full rounded-lg border border-gray-500 bg-[#0d0d0d] p-3 text-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#0d0d0d] px-5 py-3 text-lg font-medium text-white hover:bg-gray-800 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}