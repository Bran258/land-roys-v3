import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../services/Supabase.js";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!username || !password) {
      setErrorMsg("Ingrese su usuario y contraseña.");
      return;
    }

    setLoading(true);

    // 1️⃣ Buscar email y datos del usuario por username
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, email, role")
      .eq("username", username)
      .single();

    if (profileError || !profile) {
      setLoading(false);
      setErrorMsg("El usuario no existe.");
      return;
    }

    if (!profile.email) {
      setLoading(false);
      setErrorMsg("El usuario no tiene un correo asociado.");
      return;
    }

    // 2️⃣ Iniciar sesión con el email encontrado
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: profile.email,
        password,
      });

    if (loginError) {
      setLoading(false);
      setErrorMsg("Credenciales inválidas.");
      return;
    }

    const user = loginData.user;

    if (!user) {
      setLoading(false);
      setErrorMsg("Error iniciando sesión. Intente nuevamente.");
      return;
    }

    // 3️⃣ Volver a obtener rol para asegurar consistencia
    const { data: fullProfile, error: roleError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (roleError || fullProfile?.role !== "admin") {
      setLoading(false);
      setErrorMsg("No tienes permisos para acceder al panel admin.");
      await supabase.auth.signOut();
      return;
    }

    // 4️⃣ Redirigir al dashboard admin
    navigate("/admin");
    setLoading(false);
  }

  return (
    <main className="login-wrapper">
      <div className="login-container">

        <div className="login-logo">
          <h1 className="login-title">
            Land<span className="login-title-accent">Roys</span>
          </h1>
        </div>

        <div className="login-card">
          <div className="login-header">
            <p className="login-header-title">Portal de Admin</p>

            <p className="login-header-subtitle">
              Bienvenido de nuevo, por favor inicia sesión.
              <br />
              <span className="login-header-text">
                ¿No tienes una cuenta?
                <Link className="login-link" to="/admin/register">
                  Registrarse
                </Link>
              </span>
            </p>
          </div>

          {errorMsg && <p className="login-error">{errorMsg}</p>}

          <form className="login-form" onSubmit={handleLogin}>
            <label className="login-label">
              <p className="login-label-text">Usuario</p>
              <input
                className="login-input"
                placeholder="Ingrese su nombre de usuario"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="login-label">
              <p className="login-label-text">Contraseña</p>
              <input
                className="login-input"
                placeholder="Ingrese su contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="login-forgot">
              <a className="login-forgot-link" href="#">
                ¿Olvidó su contraseña?
              </a>
            </div>

            <button className="login-button" disabled={loading}>
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
