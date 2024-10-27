import React, { useState, useEffect } from "react";
import { Link, Button } from "@nextui-org/react";
import { getGeneros } from "../api/api";

const ListaGeneros = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [generos, setGeneros] = useState([]); // Usar estado para almacenar los géneros

    const rest = async () => {
        const response = await getGeneros();
        const generosData = response.data.map((genero) => genero.nombre);
        setGeneros(generosData); // Actualizar el estado con los nombres de los géneros
    };

    useEffect(() => {
        rest(); // Llamar a la función al montar el componente
    }, []);

    const itemWidth = 170; // Ancho de cada género
    const containerWidth = window.innerWidth; // Ancho del contenedor
    const maxScroll = -(generos.length * itemWidth - containerWidth + 170);

    useEffect(() => {
        // Actualizar los estados de los botones cada vez que cambia la posición del scroll
        setCanScrollLeft(scrollPosition < 0);
        setCanScrollRight(scrollPosition > maxScroll);
    }, [scrollPosition, maxScroll, generos.length]); // Asegúrate de agregar generos.length aquí

    const scrollRight = () => {
        setScrollPosition((prevPosition) => {
            const newPosition = Math.max(prevPosition - itemWidth, maxScroll);
            return newPosition;
        });
    };

    const scrollLeft = () => {
        setScrollPosition((prevPosition) => {
            const newPosition = Math.min(prevPosition + itemWidth, 0);
            return newPosition;
        });
    };

    return (
        <div className="carousel-container">
            <Button
                className="carousel-button left"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                variant="light"
            >
                &#8249;
            </Button>
            <div className="carousel">
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(${scrollPosition}px)` }}
                >
                    {generos.map((genero, index) => (
                        <Button
                            key={index}
                            as={Link}
                            color="primary"
                            className="carousel-item"
                            href={`/filtroGenero/${encodeURIComponent(genero)}`}
                        >
                            {genero} {/* Mostrar el nombre del género aquí */}
                        </Button>
                    ))}
                </div>
            </div>
            <Button
                className="carousel-button right"
                onClick={scrollRight}
                disabled={!canScrollRight}
                variant="light"
            >
                &#8250;
            </Button>
        </div>
    );
};

export default ListaGeneros;
