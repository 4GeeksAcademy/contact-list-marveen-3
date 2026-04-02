import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./layout"; 
import Contactos from "./pages/Contactos"; 
import FormularioContacto from "./pages/FormularioContacto"; 

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<div className="contenedor"><h1>404 Not Found</h1></div>} >
            <Route index element={<Contactos />} />
            <Route path="nuevo" element={<FormularioContacto />} />
            <Route path="editar/:id" element={<FormularioContacto />} />
        </Route>
    )
);