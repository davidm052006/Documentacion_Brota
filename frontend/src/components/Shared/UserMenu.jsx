import { useState } from "react";
import { handleLogout } from "../../utils/auth";

export default function UserMenu({ profile }) {
  const [open, setOpen] = useState(false);
  const userName =
    profile?.nombre?.trim() ||
    profile?.email?.split("@")[0] ||
    "Usuario";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full"
      >
        <span>Hola, {userName} </span>
        <div className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
          {initial}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-2.5 mx-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all w-[calc(100%-16px)] mt-2"
          >
            <span className="text-base w-5 text-center">↪</span>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

