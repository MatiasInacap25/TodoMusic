import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getArtistasInfo } from "../api/api";
import { Card, CardBody, Image } from "@nextui-org/react";
import { LogosSpotifyIcon } from "../icons/LogosSpotifyIcon";
import { Fa6BrandsXTwitter } from "../icons/Fa6BrandsXTwitter";
import { MdiYoutube } from "../icons/MdiYoutube";
import { MdiSoundcloud } from "../icons/MdiSoundcloud";
import { SimpleIconsShazam } from "../icons/SimpleIconsShazam";
import { MdiInternet } from "../icons/MdiInternet";
import { MdiInstagram } from "../icons/MdiInstagram";
import { IcBaselineFacebook } from "../icons/IcBaselineFacebook";
import { IcBaselineApple } from "../icons/IcBaselineApple";
import { ArcticonsAmazonMusic } from "../icons/ArcticonsAmazonMusic";
import ListaEventos from "../components/listaEventos";
import { Link } from "@nextui-org/link";
import Discografia from "../components/discografia";

function Artista() {
    const { artista } = useParams();
    const [artistaInfo, setArtistaInfo] = useState({});

    const rest = async () => {
        const response = await getArtistasInfo(artista);
        setArtistaInfo(response.data);
    };

    useEffect(() => {
        rest(); // Llamar a la función cuando se monte el componente
    }, [artista]);

    const renderSpotify = () => {
        if (artistaInfo.spotify !== "") {
            return (
                <Link color="foreground" isExternal href={artistaInfo.spotify}>
                    <LogosSpotifyIcon className="mt-auto text-white" />
                </Link>
            );
        }
    };

    const renderTwitter = () => {
        if (artistaInfo.twitter !== "") {
            return (
                <Link color="foreground" isExternal href={artistaInfo.twitter}>
                    <Fa6BrandsXTwitter className="mt-auto text-white" />
                </Link>
            );
        }
    };

    const renderYoutube = () => {
        if (artistaInfo.youtube !== "") {
            return (
                <Link color="foreground" isExternal href={artistaInfo.youtube}>
                    <MdiYoutube className="mt-auto text-white" />
                </Link>
            );
        }
    };

    const renderSoundcloud = () => {
        if (artistaInfo.soundcloud !== "") {
            return (
                <Link
                    color="foreground"
                    isExternal
                    href={artistaInfo.soundcloud}
                >
                    <MdiSoundcloud className="mt-auto text-white" />
                </Link>
            );
        }
    };

    const renderShazam = () => {
        if (artistaInfo.shazam !== "") {
            return (
                <Link color="foreground" isExternal href={artistaInfo.shazam}>
                    <SimpleIconsShazam className="mt-auto text-white" />
                </Link>
            );
        }
    };

    const renderWeb = () => {
        if (artistaInfo.paginaOficial !== "") {
            return (
                <Link
                    color="foreground"
                    isExternal
                    href={artistaInfo.paginaOficial}
                >
                    <MdiInternet className="mt-auto text-white" />
                </Link>
            );
        }
    };

    const renderInstagram = () => {
        if (artistaInfo.instagram !== "") {
            return (
                <Link
                    color="foreground"
                    isExternal
                    href={artistaInfo.instagram}
                >
                    <MdiInstagram className="mt-auto text-white" />
                </Link>
            );
        }
    };

    const renderFacebook = () => {
        if (artistaInfo.facebook !== "") {
            return (
                <Link color="foreground" isExternal href={artistaInfo.facebook}>
                    <IcBaselineFacebook className="mt-auto text-white" />
                </Link>
            );
        }
    };

    const renderApple = () => {
        if (artistaInfo.appleMusic !== "") {
            return (
                <Link
                    color="foreground"
                    isExternal
                    href={artistaInfo.appleMusic}
                >
                    <IcBaselineApple className="mt-auto text-white" />
                </Link>
            );
        }
    };

    const renderAmazon = () => {
        if (artistaInfo.amazonMusic !== "") {
            return (
                <Link
                    color="foreground"
                    isExternal
                    href={artistaInfo.amazonMusic}
                >
                    <ArcticonsAmazonMusic className="mt-auto text-white" />
                </Link>
            );
        }
    };

    return (
        <div className="w-7/12 principal relative">
            <Card className="border-none relative " shadow="sm">
                {/* Imagen de fondo difuminada */}
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-lg"
                    style={{
                        backgroundImage: `url(${artistaInfo.foto})`,
                    }}
                ></div>

                {/* Superposición de color para mejorar el contraste */}
                <div className="absolute inset-0 bg-black opacity-30"></div>

                {/* Contenido de la tarjeta */}
                <CardBody className="gap-4 p-4 grid grid-flow-col">
                    <Image
                        src={artistaInfo.foto}
                        alt="Artista"
                        className="rounded-lg  object-cover"
                    />
                    <div className="h-full justify-center text-white grid grid-rows-2">
                        <div className="mt-auto">
                            <h3 className="font-semibold text-3xl mb-2">
                                {artistaInfo.nombre}
                            </h3>
                            <p className="text-sm">{artistaInfo.descripcion}</p>
                        </div>
                        <div className="self-end flex justify-end gap-2">
                            {renderSpotify()}
                            {renderTwitter()}
                            {renderYoutube()}
                            {renderSoundcloud()}
                            {renderShazam()}
                            {renderWeb()}
                            {renderInstagram()}
                            {renderFacebook()}
                            {renderApple()}
                            {renderAmazon()}
                        </div>
                    </div>
                </CardBody>
            </Card>
            <div className="mt-7">
                <ListaEventos artistaname={artista} />
                <Discografia artistaname={artista} />
            </div>
        </div>
    );
}

export default Artista;
