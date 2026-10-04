import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./views/Home";
import Detail from "./views/Detail";
import BaseLayout from "./views/BaseLayout";


function App() {

  return (
    <>
      <div className="bg-[url(./assets/image.png)]">
        <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout/>}>
            <Route path="/" element={<Home />} index/>
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
