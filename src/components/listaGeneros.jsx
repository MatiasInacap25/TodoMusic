import React, { useState, useEffect } from "react";
import { Link, Button } from "@nextui-org/react";

const genres = [
    "Rock",
    "Pop",
    "Jazz",
    "Hip Hop",
    "Classical",
    "Reggae",
    "Blues",
    "Electronic",
    "Country",
    "Metal",
    "Reggaeton",
    "Death Metal",
    "genero1",
    "genero2",
    "genero2",
    "genero2",
    "genero2",
    "genero2",
];

const ListaGeneros = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const itemWidth = 170; // Asumiendo cada género tiene un ancho de 150px
    const containerWidth = window.innerWidth; // Asumiendo que el contenedor muestra 3 géneros a la vez
    const maxScroll = -(genres.length * itemWidth - containerWidth + 170);

    useEffect(() => {
        // Actualizar los estados de los botones cada vez que cambia la posición del scroll
        setCanScrollLeft(scrollPosition < 0);
        setCanScrollRight(scrollPosition > maxScroll);
    }, [scrollPosition, maxScroll]);

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
                    {genres.map((genre, index) => (
                        <Button
                            key={index}
                            as={Link}
                            color="primary"
                            className="carousel-item "
                            href=""
                        >
                            {genre}
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
