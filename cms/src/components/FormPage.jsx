import background from "../../assets/image.png"

export default function FormPage({ children }) {
    return (
        <div className="min-h-screen bg-cover bg-center bg-fixed text-white flex items-center justify-center px-6 pt-40 pb-10"
            style={{ backgroundImage: `url(${background})` }}>
            <div className="w-full max-w-2xl rounded-xl bg-black/40 p-8 sm:p-12 shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                {children}
            </div>
        </div>
    )
}
