import React, { useState, useEffect } from "react";
import { Link, Button, Input, Modal } from "@nextui-org/react";
import ListaGeneros from "./listaGeneros";
import { darkMode } from "../store/darkmode";
import ModalRegister from "./modalRegister";
import ModalLogin from "./modalLogin";
import { userStore } from "../store/user";
import toast, { Toaster } from "react-hot-toast";
import { getBuscadorArtistas } from "../api/api";
import { Image } from "@nextui-org/image";

function Header() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const changeDarkMode = darkMode((state) => state.setDarkMode);
    const token = userStore((state) => state.token);
    console.log(token);
    const CerrarSesion = userStore((state) => state.logout);
    const onSubmit = () => {
        CerrarSesion();
        toast.success("Sesion cerrada");
    };

    const rest = async (value) => {
        const response = await getBuscadorArtistas(value);
        setResults(response.data);
    };

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearch(value);

        // Hacer una llamada a la API para obtener los artistas
        if (value) {
            rest(value);
        } else {
            setResults([]); // Limpiar resultados si no hay texto en el input
        }
    };

    return (
        <header className="fixed w-full h-auto z-50 top-0 bg-inherit">
            <Toaster />
            <div className="grid grid-cols-3 justify-stretch items-center">
                {/* div 1 */}
                <div className="flex justify-center items-center">
                    <Button
                        className="my-6"
                        href="/"
                        as={Link}
                        color="primary"
                        variant="light"
                    >
                        <p className="logo text-4xl">TODOMUSIC</p>
                    </Button>
                    <Button onPress={changeDarkMode} isIconOnly variant="light">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                            />
                        </svg>
                    </Button>
                </div>
                {/* div 2 */}
                <div className="flex justify-center items-center relative">
                    <Input
                        radius="full"
                        className=""
                        type="text"
                        placeholder="Buscar Aristas"
                        color="default"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    {results.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 z-10 mt-1 rounded-lg border-black">
                            <ul className="max-h-60 overflow-y-auto rounded-lg">
                                {results.map((artist) => (
                                    <li
                                        key={artist.id}
                                        className="p-2 hover:bg-gray-200 rounded-lg"
                                    >
                                        <Link
                                            className="text-black"
                                            href={`/${artist.nombre}`}
                                        >
                                            {artist.nombre}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* div 3 */}
                <div className="flex justify-center items-center">
                    {token === "" ? (
                        <>
                            <ModalRegister />
                            <ModalLogin />
                        </>
                    ) : (
                        <Button color="danger" onPress={onSubmit}>
                            Cerrar Sesion
                        </Button>
                    )}
                </div>
            </div>
            <ListaGeneros />
        </header>
    );
}

export default Header;
