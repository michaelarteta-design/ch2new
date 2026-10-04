export default function Button({ children, type = "button", onClick, disabled = false }) {
    return (
        <button type={type} onClick={onClick} disabled={disabled}
            className="rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
            {children}
        </button>
    )
}
