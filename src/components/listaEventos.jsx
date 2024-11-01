import React, { useState, useEffect } from "react";
import { getEventosByArtista } from "../api/api";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function ListaEventos({ artistaname }) {
    const navigate = useNavigate();

    const [eventosInfo, setEventosInfo] = useState([]); // Inicializar como un array
    const [loading, setLoading] = useState(true); // Manejar el estado de carga
    const [error, setError] = useState(null); // Manejar errores

    const rest = async () => {
        try {
            const response = await getEventosByArtista(artistaname);
            setEventosInfo(response.data); // Suponiendo que response.data es un array
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const monthAbbreviations = [
        "ENE",
        "FEB",
        "MAR",
        "ABR",
        "MAY",
        "JUN",
        "JUL",
        "AGO",
        "SEP",
        "OCT",
        "NOV",
        "DIC",
    ];

    useEffect(() => {
        rest(); // Llamar a la función cuando se monte el componente
    }, [artistaname]); // Dependencia correcta

    return (
        <div>
            <h1 className="text-3xl m-3">Próximos eventos</h1>
            {eventosInfo.length === 0 ? (
                <p>No hay eventos próximos para {artistaname}.</p> // Manejar caso de no eventos
            ) : (
                <Listbox>
                    {eventosInfo.map((evento) => {
                        const date = new Date(`${evento.fecha}T00:00:00`); // Asegúrate de que se interprete como medianoche
                        const year = date.getFullYear();
                        const month = monthAbbreviations[date.getMonth()]; // Mes empieza desde 0
                        const day = date.getDate(); // Obtener el día sin ceros a la izquierda

                        return (
                            <ListboxItem
                                className="p-3 m-1 bg-zinc-900"
                                onPress={() => {
                                    navigate(
                                        `/${artistaname}/eventos/${encodeURIComponent(
                                            evento.id
                                        )}`
                                    );
                                }}
                                key={evento.id}
                                startContent={
                                    <div className="grid justify-items-center w-12 h-19 bg-blue-600 rounded-lg">
                                        <p className="h-2 text-sm">{month}</p>
                                        <p className="text-4xl mt-2">
                                            {day}{" "}
                                            {/* Día sin ceros a la izquierda */}
                                        </p>
                                        <p>{year}</p>
                                    </div>
                                }
                            >
                                <p className="m-2 text-lg">{evento.titulo}</p>
                            </ListboxItem>
                        );
                    })}
                </Listbox>
            )}
        </div>
    );
}

export default ListaEventos;
