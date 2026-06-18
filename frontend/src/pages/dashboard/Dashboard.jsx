import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabase";

import DashboardLayout from "../../components/Layout/DashboardLayout";
import HeroBanner from "./components/HeroBanner";
import ProfileCard from "./components/ProfileCard";
import QuickActions from "./components/QuickActions";
import ContinueSection from "./components/ContinueSection";

export default function Dashboard({ user }) {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ─── Cargar perfil ──────────────────────────────────────────────────────────
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error: err } = await supabase
          .from("perfiles_usuario")
          .select("*")
          .eq("user_id", user.id)
          .single();
        if (err) throw err;
        setProfile(data);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
        setError(err.message);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (user?.id) getProfile();
  }, [user?.id]);

  // ─── Estados de carga / error ───────────────────────────────────────────────
  if (loadingProfile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400 text-sm animate-pulse">
            Cargando tu perfil…
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500 font-semibold mb-2">Ocurrió un error</p>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ─── Render principal ───────────────────────────────────────────────────────
  return (
    <DashboardLayout profile={profile}>
      <div className="p-6 max-w-6xl mx-auto">
        {/* ── Hero + Perfil (lado a lado) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-3">
            <HeroBanner name={profile?.nombre} />
          </div>
          <div className="lg:col-span-2">
            <ProfileCard profile={profile} userEmail={user?.email} />
          </div>
        </div>

        {/* ── Acciones rápidas ── */}
        <div className="mb-6">
          <QuickActions />
        </div>

        {/* ── Continuar + Frase motivacional ── */}
        <ContinueSection perfilUsuarioId={profile?.id} userId={user?.id} />
      </div>
    </DashboardLayout>
  );
}