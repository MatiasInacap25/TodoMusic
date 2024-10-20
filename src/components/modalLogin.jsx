import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Link,
} from "@nextui-org/react";
import { darkMode } from "../store/darkmode";
import { useForm } from "react-hook-form";
import { login } from "../api/login.api";
import toast, { Toaster } from "react-hot-toast";
import { userStore } from "../store/user";

function ModalRegister() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const modoOscuro = darkMode((state) => state.darkMode);
    const loginUser = userStore((state) => state.login);

    // Solo obtenemos el token y userType del estado

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const rest = await login(data);
        console.log(rest);
        if (rest.status === 200) {
            toast.success("Inicio de sesión exitoso");
            console.log("Toast");
            const { token, user } = rest.data;
            loginUser({ token, userType: user.user_type }); // Asegúrate de que `user.role` sea el tipo de usuario
        }
    });

    return (
        <>
            <Button className="mx-2" onPress={onOpen} color="primary">
                Iniciar Sesión
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
                                Inicio de sesión
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={onSubmit}>
                                    <Input
                                        autoFocus
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
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm ml-1">
                                            {errors.email.message}
                                        </span>
                                    )}
                                    <Input
                                        className="mt-3"
                                        label="Password"
                                        placeholder="Ingrese su contraseña"
                                        type="password"
                                        variant="bordered"
                                        {...register("password")}
                                    />
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
                                            Iniciar sesión
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
