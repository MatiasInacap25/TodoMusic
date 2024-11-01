import { create } from "zustand";

// Función para obtener el estado inicial del almacenamiento local
const getInitialUserState = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { token: "", userType: "" }; 
};

export const userStore = create((set) => ({
    ...getInitialUserState(), // Carga el estado inicial desde localStorage
    login: (data) => {
        const { token, userType } = data; // Asegúrate de que `data` contenga `token` y `userType`
        set({
            token: token,
            userType: userType, // Almacena el tipo de usuario
        });

        // Guarda los datos en localStorage
        localStorage.setItem("user", JSON.stringify({ token, userType }));
        console.log(token, userType); // Muestra el token y el tipo de usuario
    },
    logout: () => {
        set({ token: "", userType: "" }); // Limpia el estado
        localStorage.removeItem("user"); // Limpia el almacenamiento local al cerrar sesión
    }
}));

// Exporta la tienda para su uso
export const useUserStore = () => userStore((state) => state);
