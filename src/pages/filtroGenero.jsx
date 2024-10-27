import { useParams } from "react-router-dom";
import { getArtistasByGenero } from "../api/api";
import React, { useState, useEffect } from "react";
import { Card, CardFooter } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function FiltroGenero() {
    const navigate = useNavigate();
    const [artistas, setArtistas] = useState([]);

    const { genero } = useParams();
    const rest = async () => {
        const response = await getArtistasByGenero(genero);
        setArtistas(response.data);
        console.log(artistas);
    };

    useEffect(() => {
        rest(); // Llamar a la función cuando se monte el componente
    }, [genero]);

    return (
        <div className="w-9/12 principal">
            <div className="gap-2 grid sm:grid-cols-6">
                {artistas.map((artista, index) => (
                    <Card
                        isPressable
                        onPress={() => {
                            navigate(
                                `/artista/${encodeURIComponent(artista.nombre)}`
                            );
                            console.log("click");
                        }}
                        key={index}
                        radius="lg"
                        shadow="sm"
                        isFooterBlurred
                    >
                        <img src={artista.foto} alt="" />
                        <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p>{artista.nombre}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default FiltroGenero;
