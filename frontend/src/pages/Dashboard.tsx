import { useNavigate } from "react-router-dom";
import { Checklist } from "@/components/CheckList";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bbg-gray-100">
      {/**Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                🎮 Habit Gamidication
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Usuario</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/**Encabezado de Hábitos*/}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600 mt-2">
            Bienvenido a tu panel de control de hábitos
          </p>
        </div>

        {/**Checklist de Hábitos*/}
        <Checklist/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/**Card de Hábitos */}
          <button
            onClick={() => navigate('/habits')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-shadow text-left group hover:cursor-pointer"
          >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Mis Hábitos</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-gray-600">Gestion de hábitos diarios</p>
            <div className="mt-4 text-indigo-600 font-medium flex items-center gap-1">
              Ver todos →
            </div>
          </div>
          </button>

          {/**Card de Nivel Actual */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Tu Nivel</h3>
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-gray-600">Sistema de niveles y puntos</p>
          </div>

          {/**Card de Logros Adquiridos */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Logros</h3>
              <span className="text-2xl">🎯</span>
            </div>
            <p>Lista de logros alcanzados</p>
          </div>

          {/**Card de Ranking */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Ranking</h3>
              <span className="text-2xl">🎖️</span>
            </div>
            <p className="text-gray-600">Tu posición en el ranking</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
