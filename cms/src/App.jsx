import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import Login from "./pages/Login";
import MovieList from "./pages/MovieList"
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import UploadImage from "./pages/UploadImage";
import AddStaff from "./pages/AddStaff";



function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={< Login />}/>
                    <Route element={<BaseLayout />}>
                        <Route path="/" element={<MovieList />} />
                        <Route path="/add" element={< Add />} />
                        <Route path="/edit/:id" element={< Edit />} />
                        <Route path="/upload/:id" element={<UploadImage />} />
                        <Route path="/add-staff" element={<AddStaff />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}

export default App