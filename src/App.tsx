import {BrowserRouter, Routes, Route  } from "react-router";

import './App.css'
import Home from "./pages/Home.tsx";
import Favorite from "./pages/Favorite.tsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorite" element={<Favorite />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
