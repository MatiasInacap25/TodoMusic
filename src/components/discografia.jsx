import React, { useState, useEffect } from "react";
import { getAlbumsByArtista } from "../api/api";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Image } from "@nextui-org/image";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

function Discografia({ artistaname }) {
    const [albumInfo, setAlbumInfo] = useState([]); // Inicializar como un array
    const [loading, setLoading] = useState(true); // Manejar el estado de carga
    const [error, setError] = useState(null);

    const rest = async () => {
        try {
            const response = await getAlbumsByArtista(artistaname);
            setAlbumInfo(response.data.albumes);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        rest(); // Llamar a la función cuando se monte el componente
    }, [artistaname]);

    if (loading) {
        return <div>Cargando...</div>; // Mensaje de carga
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Mensaje de error
    }

    return (
        <div>
            <h1 className="text-3xl m-3">Álbumes</h1>
            <Accordion variant="bordered">
                {albumInfo.map((album) => (
                    <AccordionItem
                        startContent={
                            <Image
                                src={album.foto}
                                alt={`Portada del álbum ${album.titulo}`} // Descripción alternativa
                                width={100} // Ajusta el ancho según sea necesario
                                height={100} // Ajusta la altura según sea necesario
                                objectFit="cover" // Mantiene la proporción de la imagen
                            />
                        }
                        key={album.id}
                        title={
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-4xl m-1">
                                        {album.titulo}
                                    </p>
                                    <p className="text-base m-1">
                                        {album.year}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1">
                                    <p className="justify-end self-center m-1 flex text-base">
                                        {album.cantidad_canciones} Canciones
                                    </p>
                                </div>
                            </div>
                        }
                    >
                        <Listbox>
                            {album.canciones.map((cancion, index) => (
                                <ListboxItem
                                    endContent={
                                        <p className="m-2 text-lg">
                                            {cancion.duracion}
                                        </p>
                                    }
                                    key={cancion.id}
                                >
                                    <p className="m-2 text-lg">
                                        {index + 1}. {cancion.titulo}{" "}
                                    </p>
                                </ListboxItem>
                            ))}
                        </Listbox>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default Discografia;
