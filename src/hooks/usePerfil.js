import { useState, useEffect } from "react";
import { supabase } from "../services/Supabase";

export const usePerfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [persona, setPersona] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ---------------------------------------------------
  // CARGAR PERFIL + PERSONA
  // ---------------------------------------------------
  const cargarPerfil = async () => {
    setCargando(true);
    setError(null);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("No hay usuario autenticado");

      // PERFIL
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;
      setPerfil(profileData);

      // PERSONA
      const { data: personaData, error: personaError } = await supabase
        .from("personas")
        .select("*")
        .eq("profile_id", user.id)
        .single();

      if (personaError && personaError.code !== "PGRST116") throw personaError;

      setPersona(personaData ?? null);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // ---------------------------------------------------
  // ACTUALIZAR PROFILE
  // ---------------------------------------------------
  const actualizarPerfil = async (data) => {
    if (!perfil) return false;

    try {
      setCargando(true);

      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== "")
      );

      const { error } = await supabase
        .from("profiles")
        .update(cleanData)
        .eq("id", perfil.id);

      if (error) throw error;

      setPerfil((prev) => ({ ...prev, ...cleanData }));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setCargando(false);
    }
  };

  // ---------------------------------------------------
  // ACTUALIZAR PERSONA
  // ---------------------------------------------------
  const actualizarPersona = async (data) => {
    try {
      setCargando(true);

      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== "")
      );

      // CREAR SI NO EXISTE
      if (!persona) {
        const { data: nuevaPersona, error: insertError } = await supabase
          .from("personas")
          .insert({
            profile_id: perfil.id,
            ...cleanData,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        setPersona(nuevaPersona);
        return true;
      }

      // ACTUALIZAR SI EXISTE
      const { error } = await supabase
        .from("personas")
        .update(cleanData)
        .eq("profile_id", perfil.id);

      if (error) throw error;

      setPersona((prev) => ({ ...prev, ...cleanData }));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setCargando(false);
    }
  };

  // ---------------------------------------------------
  // SUBIR AVATAR
  // ---------------------------------------------------
  const subirAvatar = async (file) => {
    if (!file || !perfil?.id) return;

    const fileName = `${perfil.id}-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (uploadError) {
      setError(uploadError.message);
      return null;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    await actualizarPerfil({ avatar_url: data.publicUrl });

    return data.publicUrl;
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  return {
    perfil,
    persona,
    cargando,
    error,
    cargarPerfil,
    actualizarPerfil,
    actualizarPersona,
    subirAvatar,
  };
};
