import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import { darkMode } from "./store/darkmode";

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
                    </Routes>
                </Router>
            </main>
        </>
    );
}

export default App;
