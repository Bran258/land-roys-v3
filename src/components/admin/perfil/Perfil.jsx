import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FiCamera,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiLock,
} from "react-icons/fi";
import { usePerfil } from "../../../hooks/usePerfil";
import "./perfil.css";
import Loading from "../../ui/Loading";

const Perfil = () => {
  const {
    perfil,
    persona,
    cargando,
    error,
    actualizarPerfil,
    actualizarPersona,
    subirAvatar,
  } = usePerfil();

  const [formPersona, setFormPersona] = useState({});
  const [formProfile, setFormProfile] = useState({});
  const [bio, setBio] = useState("");

  // Inicializar formularios cuando cargan los datos
  useEffect(() => {
    if (persona) {
      setFormPersona({
        nombres: persona.nombres ?? "",
        apellidos: persona.apellidos ?? "",
        edad: persona.edad ?? "",
        sexo: persona.sexo ?? "O",
        celular: persona.celular ?? "",
        biografia: persona.biografia ?? "",
      });

      setBio(persona.biografia ?? "");
    }

    if (perfil) {
      setFormProfile({
        email: perfil.email ?? "",
      });
    }
  }, [perfil, persona]);

  if (cargando) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  const handlePersonaChange = (e) => {
    setFormPersona({ ...formPersona, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e) => {
    setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
  };

  // -------------------------------------------------------
  // SWEETALERT2 + GUARDAR PERFILES
  // -------------------------------------------------------
  const handleGuardar = async () => {
    const confirm = await Swal.fire({
      title: "¿Guardar cambios?",
      text: "Se actualizará tu perfil y tu información personal.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    // Mostrar carga
    Swal.fire({
      title: "Guardando...",
      text: "Por favor espera",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const ok1 = await actualizarPerfil(formProfile);
    const ok2 = await actualizarPersona({ ...formPersona, biografia: bio });

    Swal.close();

    if (ok1 && ok2) {
      Swal.fire({
        title: "¡Guardado!",
        text: "Tu información ha sido actualizada.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudieron guardar los datos.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Swal.fire({
      title: "Subiendo avatar...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    await subirAvatar(file);

    Swal.close();

    Swal.fire({
      title: "¡Avatar actualizado!",
      icon: "success",
    });
  };

  return (
    <div className="perfil-container">
      <div className="max-w-6xl mx-auto">
        <h1 className="titulo-perfil">Perfil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CARD IZQUIERDA */}
          <div className="lg:col-span-1">
            <div className="card-perfil">
              <div className="avatar-container">
                <img
                  alt="Avatar"
                  className="avatar-img"
                  src={perfil?.avatar_url || "https://placehold.co/200"}
                />

                <label className="btn-cambiar-foto">
                  <FiCamera size={18} />
                  <input type="file" hidden onChange={handleAvatar} />
                </label>
              </div>

              <h2 className="nombre-perfil">{perfil.username}</h2>
              <p className="rol-perfil">{perfil.role}</p>

              <div className="divider"></div>

              <div className="info-perfil">
                <div className="info-item">
                  <FiMail className="icono" />
                  {perfil.email || "Sin correo"}
                </div>
                <div className="info-item">
                  <FiPhone className="icono" />
                  {persona?.celular || "—"}
                </div>
                <div className="info-item">
                  <FiMapPin className="icono" />
                  {persona?.direccion || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* FORMULARIOS DERECHA */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información Personal */}
            <div className="card-perfil">
              <h3 className="section-title">
                <FiUser /> Información Personal
              </h3>

              <form className="form-grid">
                <div>
                  <label>Nombres</label>
                  <input
                    type="text"
                    name="nombres"
                    value={formPersona.nombres || ""}
                    onChange={handlePersonaChange}
                  />
                </div>

                <div>
                  <label>Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formPersona.apellidos || ""}
                    onChange={handlePersonaChange}
                  />
                </div>

                <div>
                  <label>Edad</label>
                  <input
                    type="number"
                    name="edad"
                    value={formPersona.edad || ""}
                    onChange={handlePersonaChange}
                  />
                </div>

                <div>
                  <label>Sexo</label>
                  <select
                    name="sexo"
                    value={formPersona.sexo || ""}
                    onChange={handlePersonaChange}
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">Otro</option>
                  </select>
                </div>

                <div>
                  <label>Celular</label>
                  <input
                    type="tel"
                    name="celular"
                    value={formPersona.celular || ""}
                    onChange={handlePersonaChange}
                  />
                </div>

                <div className="col-span-2">
                  <label>Biografía</label>
                  <textarea
                    rows="3"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* Seguridad */}
            <div className="card-perfil">
              <h3 className="section-title">
                <FiLock /> Seguridad
              </h3>

              <form className="space-y-4">
                <div>
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formProfile.email || ""}
                    onChange={handleProfileChange}
                  />
                </div>
              </form>
            </div>

            {/* Botones */}
            <div className="acciones">
              <button className="btn-cancelar">Cancelar</button>
              <button className="btn-guardar" onClick={handleGuardar}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
