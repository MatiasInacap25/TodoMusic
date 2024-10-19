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

function ModalRegister() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const modoOscuro = darkMode((state) => state.darkMode);

    const { register } = useForm();

    return (
        <>
            <Button className="mx-2" onPress={onOpen} color="primary">
                Iniciar Sesion
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
                                Inicio de sesion
                            </ModalHeader>
                            <ModalBody>
                                <form action="">
                                    <Input
                                        autoFocus
                                        label="Email"
                                        placeholder="Ingrese su email"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                        variant="bordered"
                                    />
                                    <div className="flex py-2 px-1 justify-between">
                                        <Checkbox
                                            classNames={{
                                                label: "text-small",
                                            }}
                                        >
                                            Remember me
                                        </Checkbox>
                                        <Link
                                            color="primary"
                                            href="#"
                                            size="sm"
                                        >
                                            Olvido su contraseña?
                                        </Link>
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalRegister;
