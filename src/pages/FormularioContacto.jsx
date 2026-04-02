import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const FormularioContacto = () => {
    const { id } = useParams();
    const { store } = useGlobalReducer();
    const navegar = useNavigate();
    
    const [datos, setDatos] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const usuario = "marveen";

    useEffect(() => {
        if (id && store.contactos.length > 0) {
            const editando = store.contactos.find(c => c.id === parseInt(id));
            if (editando) setDatos(editando);
        }
    }, [id, store.contactos]);

    const handleChanges = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const guardar = async (e) => {
        e.preventDefault();
        const url = id 
            ? `https://playground.4geeks.com/contact/agendas/${usuario}/contacts/${id}`
            : `https://playground.4geeks.com/contact/agendas/${usuario}/contacts`;
        
        const metodo = id ? "PUT" : "POST";

        try {
            const resp = await fetch(url, {
                method: metodo,
                body: JSON.stringify(datos),
                headers: { "Content-Type": "application/json" }
            });
            if (resp.ok) navegar("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
    <div className="container-fluid bg-dark text-light min-vh-100 py-5">

    <header className="d-flex justify-content-around align-items-center mb-4 border-bottom border-secondary pb-3">
        <h1 className="h3 fw-bold mb-0">{id ? "Editar" : "Nuevo"}</h1>
        <button className="btn btn-outline-light" onClick={()=>navegar("/")}>
            Volver
        </button>
    </header>

    <form onSubmit={guardar} className="mx-auto col-12 col-md-8 col-lg-6 bg-black p-4 rounded-4 shadow">

        <div className="mb-3">
            <label className="form-label text-secondary">Nombre completo</label>
            <input
                className="form-control bg-secondary text-light border-0"
                name="name"
                value={datos.name}
                onChange={handleChanges}
                required
            />
        </div>

        <div className="mb-3">
            <label className="form-label text-secondary">Correo electrónico</label>
            <input
                className="form-control bg-secondary text-light border-0"
                type="email"
                name="email"
                value={datos.email}
                onChange={handleChanges}
                required
            />
        </div>

        <div className="mb-3">
            <label className="form-label text-secondary">Teléfono</label>
            <input
                className="form-control bg-secondary text-light border-0"
                name="phone"
                value={datos.phone}
                onChange={handleChanges}
                required
            />
        </div>

        <div className="mb-4">
            <label className="form-label text-secondary">Dirección física</label>
            <input
                className="form-control bg-secondary text-light border-0"
                name="address"
                value={datos.address}
                onChange={handleChanges}
                required
            />
        </div>

        <button
            type="submit"
            className="btn btn-success w-100 py-2 fw-semibold mt-3"
        >
            Confirmar Registro
        </button>

    </form>
</div>
    );
};

export default FormularioContacto;