import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const Contactos = () => {
    const { store, dispatch } = useGlobalReducer();
    const [idEnLlamas, setIdEnLlamas] = useState(null); // Nuevo estado para controlar la animación

    const usuario = "marveen";
    const urlBase = `https://playground.4geeks.com/contact/agendas/${usuario}`;

    useEffect(() => {
        obtener();
    }, []);

    const obtener = async () => {
        try {
            const resp = await fetch(urlBase);
            if (resp.status === 404) {
                await crearAgenda();
                return;
            }
            const data = await resp.json();
            if (data && data.contacts) {
                dispatch({ type: "CARGAR_CONTACTOS", payload: data.contacts });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const crearAgenda = async () => {
        try {
            await fetch(urlBase, { method: "POST" });
            await obtener();
        } catch (err) {
            console.error(err);
        }
    };

   const borrar = async (id) => {
    try {
        const resp = await fetch(`${urlBase}/contacts/${id}`, { method: "DELETE" });
        if (resp.ok) {
            setIdEnLlamas(id);
            setTimeout(() => {
                dispatch({ type: "BORRAR_LOCAL", payload: id });
                setIdEnLlamas(null);
            }, 0);
        }
    } catch (err) {
        console.error(err);
    }
};

    return (
        <div className="container-fluid bg-dark text-light min-vh-100 py-5">
            <header className="d-flex justify-content-around align-items-center mb-4 border-bottom border-secondary pb-3">
                <h1 className="h3 fw-bold mb-0">Agenda</h1>
                <Link className="btn btn-outline-light" to="/nuevo">+ Añadir</Link>
            </header>

            <div className="row g-3">
                {store.contactos.length === 0 ? (
                    <p className="text-center text-light">Añade tus contactos.</p>
                ) : (
                    store.contactos.map(c => (
                        <div key={c.id} className="col-12 col-md-6 col-lg-4">
                            <div
                                className={`card bg-secondary  text-light shadow border-0 h-100 ${idEnLlamas === c.id ? "opacity-50" : ""
                                    }`}
                            >
                                <div className="card-body border-bottom border-dark">

                                    <div className="fw-semibold fs-5 mb-2">{c.name}</div>

                                    <div className="small text-light mb-1">
                                        {c.phone} | {c.email}
                                    </div>

                                    <div className="small text-light">
                                        {c.address}
                                    </div>

                                </div>

                                <div className="card-footer bg-transparent d-flex justify-content-between gap-2">

                                    <Link
                                        className="btn bg-info-subtle text-secondary btn-sm btn-outline-light w-100"
                                        to={`/editar/${c.id}`}
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        className="btn bg-danger-subtle btn-sm btn-outline-danger w-100"
                                        onClick={() => borrar(c.id)}
                                    >
                                        Borrar
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Contactos;