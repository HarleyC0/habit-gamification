import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      {/**Navbar */}
      <nav>
        <div>
          <div>
            <div>
              <h1>Habit Gamidication</h1>
            </div>
            <div>
              <span>Usuario</span>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        {/**Encabezado de Hábitos*/}
        <div>
          <h2>Dashboard</h2>
          <p>Bienvenido a tu panel de control de habnbitos</p>
        </div>

        <div>
          <div>
            <h3>Mis hábitos</h3>
            <div>
              <p>Lista de hábitos diarios</p>
            </div>
          </div>
        </div>

        {/**Logros por lo hábitos */}
        <div>
          <div>
            <h3>Logros</h3>
            <div>
              Tus logros desbloqueados
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
