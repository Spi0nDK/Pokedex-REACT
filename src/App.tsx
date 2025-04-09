import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Home from "./pages/Home.tsx";
import Favorite from "./pages/Favorite.tsx";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFavoritesFromDb } from "./store/thunks/fetchFavoritesFromDb.ts";
import { AppDispatch } from "./store/store.ts";
import Pokemon from "./components/Pokemon";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchFavoritesFromDb());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/pokemon/:id" element={<Pokemon />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
