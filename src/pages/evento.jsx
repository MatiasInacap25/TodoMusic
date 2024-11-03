import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import { getBuscadorEventos } from "../api/api";
import { FluentLocation16Regular } from "../icons/FluentLocation16Regular";
import { UiwDate } from "../icons/UiwDate";
import { LucideLink } from "../icons/LucideLink";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Importa Marker y Popup
import "leaflet/dist/leaflet.css"; // Asegúrate de tener los estilos de Leaflet

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

function Evento() {
    const { id, artista } = useParams();
    const [eventoInfo, setEventoInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await getBuscadorEventos(id);
                setEventoInfo(response.data[0]); // Suponiendo que la API devuelve un array
            } catch (error) {
                console.error("Error fetching event data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvento();
    }, [id]);

    if (loading) return <div>Cargando...</div>;

    if (!eventoInfo) return <div>No se encontró el evento</div>;

    const date = new Date(`${eventoInfo.fecha}T00:00:00`);
    const formattedDate = `${date.getFullYear()}-${
        monthAbbreviations[date.getMonth()]
    }-${date.getDate()}`;

    return (
        <div className="w-7/12 principal relative">
            <EventoCard
                eventoInfo={eventoInfo}
                artista={artista}
                formattedDate={formattedDate}
            />
        </div>
    );
}

function EventoCard({ eventoInfo, artista, formattedDate }) {
    useEffect(() => {
        // Inicializar el mapa
        const map = L.map("map").setView(
            [eventoInfo.latitud, eventoInfo.longitud],
            13
        );

        // Añadir la capa de mosaico de OpenStreetMap
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Añadir un marcador
        const marker = L.marker([eventoInfo.latitud, eventoInfo.longitud])
            .addTo(map)
            .bindPopup(eventoInfo.lugar)
            .openPopup();

        // Limpiar el mapa al desmontar el componente
        return () => {
            map.remove();
        };
    }, []);
    return (
        <>
            <Card className="border-none relative" shadow="sm">
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-lg"
                    style={{
                        backgroundImage: `url(${eventoInfo.foto})`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <CardBody className="grid grid-flow-col gap-4 p-4 ">
                    <div className="self-center">
                        <a className="text-4xl m-2" href={`/${artista}`}>
                            {artista}
                        </a>
                        <p className="text-4xl m-2">{eventoInfo.titulo}</p>
                        <div className="m-2 mt-4 gap-2 flex">
                            <FluentLocation16Regular />
                            <div className="self-center text-lg">
                                {eventoInfo.lugar}
                                <p className="text-gray-400 text-base">
                                    {eventoInfo.ciudad}, {eventoInfo.pais}
                                </p>
                            </div>
                        </div>
                        <p className="m-2 flex gap-2">
                            <UiwDate />
                            <div className="self-center text-lg">
                                {formattedDate}
                            </div>
                        </p>
                        <Link
                            className="m-2 text-2xl"
                            isExternal
                            color="foreground"
                            href={eventoInfo.entradas}
                            anchorIcon={<LucideLink />}
                            showAnchorIcon
                        >
                            Entradas
                        </Link>
                    </div>
                    <div className="text-xl m-2"></div>
                    <div className="justify-end self-end flex gap-2 m-2">
                        <Image src={eventoInfo.foto} alt="Evento" />
                    </div>
                </CardBody>
            </Card>
            <div
                id="map"
                className="m-2 mt-4"
                style={{ height: "400px", width: "98%" }}
            ></div>
        </>
    );
}

export default Evento;
