import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
} from "@nextui-org/react";
import { darkMode } from "../store/darkmode";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/api";
import toast from "react-hot-toast";
import { userStore } from "../store/user";

function ModalRegister() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const modoOscuro = darkMode((state) => state.darkMode);
    const loginUser = userStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const rest = await registerUser(data);
        console.log(rest);
        if (rest.status === 201) {
            toast.success("Registro exitoso");
            const { token, user } = rest.data;
            loginUser({ token, userType: user.user_type }); // Asegúrate de que `user.role` sea el tipo de usuario
        }
    });

    return (
        <>
            <Button className="mx-2" onPress={onOpen} color="primary">
                Registrarse
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent
                    className={`${
                        modoOscuro ? "dark" : ""
                    } text-foreground bg-background`}
                >
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Registro
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={onSubmit}>
                                    <Input
                                        autoFocus
                                        label="nombre"
                                        placeholder="Ingrese su nombre"
                                        variant="bordered"
                                        {...register("nombre", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Debe ingresar un nombre",
                                            },
                                        })}
                                    />
                                    {errors.nombre && (
                                        <span className="text-red-500 text-sm ml-1">
                                            {errors.nombre.message}
                                        </span>
                                    )}
                                    <Input
                                        className="mt-3"
                                        label="Apellido"
                                        placeholder="Ingrese su apellido"
                                        variant="bordered"
                                        {...register("apellido", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Debe ingresar un apellido",
                                            },
                                        })}
                                    />
                                    {errors.apellido && (
                                        <span className="text-red-500 text-sm ml-1">
                                            {errors.apellido.message}
                                        </span>
                                    )}
                                    <Input
                                        className="mt-3"
                                        label="Nombre de usuario"
                                        placeholder="Ingrese su nombre de usuario"
                                        variant="bordered"
                                        {...register("username", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Debe ingresar un nombre de usuario",
                                            },
                                        })}
                                    ></Input>
                                    {errors.username && (
                                        <span className="text-red-500 text-sm ml-1">
                                            {errors.username.message}
                                        </span>
                                    )}
                                    <Input
                                        className="mt-3"
                                        label="Email"
                                        placeholder="Ingrese su email"
                                        variant="bordered"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Debe ingresar un email",
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                message:
                                                    "Debe ingresar un email valido",
                                            },
                                        })}
                                    ></Input>
                                    {errors.email && (
                                        <span className="text-red-500 text-sm ml-1">
                                            {errors.email.message}
                                        </span>
                                    )}
                                    <Input
                                        className="mt-3"
                                        label="contraseña"
                                        placeholder="Ingrese su contraseña"
                                        type="password"
                                        variant="bordered"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Debe ingresar una contraseña",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <span className="text-red-500 text-sm ml-1">
                                            {errors.password.message}
                                        </span>
                                    )}
                                    <div className="flex py-2 px-1 justify-between">
                                        <Link
                                            color="primary"
                                            href="#"
                                            size="sm"
                                        >
                                            ¿Olvidó su contraseña?
                                        </Link>
                                    </div>
                                    <ModalFooter>
                                        <Button
                                            color="danger"
                                            variant="flat"
                                            onPress={onClose}
                                        >
                                            Cerrar
                                        </Button>
                                        <Button color="primary" type="submit">
                                            Registarse
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalRegister;
