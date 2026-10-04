import Button from "./Button"
export default function From({ movie, setMovie, onSubmit, isSaving, isEdit = false }) {
    function handleChange(e) {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }
    const inputClass = "block w-full rounded-lg border border-gray-500 bg-[#0d0d0d] p-3 text-white"
    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <h1 className="text-3xl font-medium">{isEdit ? "Edit Movie" : "Add Movie"}</h1>
            <div>
                <label htmlFor="title" className="block mb-2">Movie title</label>
                <input id="title" name="title" type="text" required
                    value={movie.title} onChange={handleChange} className={inputClass} />
            </div>
            <div>
                <label htmlFor="genreId" className="block mb-2">Genre ID</label>
                <input id="genreId" name="genreId" type="number" min="1" step="1" required
                    value={movie.genreId} onChange={handleChange} className={inputClass} />
            </div>
            <div>
                <label htmlFor="rating" className="block mb-2">Rating</label>
                <input id="rating" name="rating" type="number" min="0" max="10" step="0.1" required
                    value={movie.rating} onChange={handleChange} className={inputClass} />
            </div>
            <div>
                <label htmlFor="imgUrl" className="block mb-2">Image URL</label>
                <input id="imgUrl" name="imgUrl" type="url" required
                    value={movie.imgUrl} onChange={handleChange} className={inputClass} />
            </div>
            <div>
                <label htmlFor="trailerUrl" className="block mb-2">Trailer URL</label>
                <input id="trailerUrl" name="trailerUrl" type="url" required
                    value={movie.trailerUrl} onChange={handleChange} className={inputClass} />
            </div>
            <div>
                <label htmlFor="synopsis" className="block mb-2">Synopsis</label>
                <textarea id="synopsis" name="synopsis" rows={5} required
                    value={movie.synopsis} onChange={handleChange} className={inputClass} />
            </div>
            <Button type="submit" disabled={isSaving}>
                {isSaving ? "Menyimpan..." : isEdit ? "Save Changes" : "Add Movie"}
            </Button>
        </form>
    )
}
