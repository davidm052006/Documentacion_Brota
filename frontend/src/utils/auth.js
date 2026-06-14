// src/utils/auth.js
import { supabase } from "../config/supabase";

export async function handleLogout(isDemoMode = false) {
  if (isDemoMode) {
    localStorage.removeItem("demoModeLoggedIn");
    localStorage.removeItem("demoUserEmail");
    localStorage.removeItem("demoUserName");
  } else {
    await supabase.auth.signOut();
  }
  window.location.href = "/";
}