import axios from "axios";
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

export const login = (loginData) => {
    return api.post("/login", loginData);
};

export const registerUser = (registerData) => {
    return api.post("/register", registerData);
};

export const getGeneros = () => {
    return api.get("/generos");
};

export const getArtistasByGenero = (genero) => {
    return api.get(`/artistas/genero/${genero}`);
};

export const getArtistasInfo = (artista) => {
    return api.get(`/artista/${artista}`);
};

export const getEventosByArtista = (artista) => {
    return api.get(`/eventos/${artista}`);
};

export const getAlbumsByArtista = (artista) => {
    return api.get(`/albumes/${artista}`);
};

export const getBuscadorArtistas = (query) => {
    return api.get(`/artistas/?query=${query}`);
};
