import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Artista() {
    const { artista } = useParams();

    return (
        <div className="w-9/12 principal">
            <p>Artista seleccionado: {artista}</p>
        </div>
    );
}

export default Artista;
