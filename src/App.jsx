import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import { darkMode } from "./store/darkmode";
import FiltroGenero from "./pages/filtroGenero";
import Artista from "./pages/artista";

function App() {
    const modoOscuro = darkMode((state) => state.darkMode);

    return (
        <>
            <main
                className={`${
                    modoOscuro ? "dark" : ""
                } text-foreground bg-background `}
            >
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/filtroGenero/:genero"
                            element={<FiltroGenero />}
                        ></Route>
                        <Route path="/:artista" element={<Artista />}></Route>
                        <Route path="/:artista/eventos/:id"></Route>
                    </Routes>
                </Router>
            </main>
        </>
    );
}

export default App;
