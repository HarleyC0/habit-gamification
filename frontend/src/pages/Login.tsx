import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div>
        {/*Titulo Inicial*/}
        <div>
          <h1>Hait Gamification</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        {/*Formulario de Login */}
        <form onSubmit={handleSubmit}>
          {/*Email */}
          <div>
            <label htmlFor="email">
              Email
            </label>
            <input type="email" placeholder="ejemplo@email.com"/>
          </div>

          {/*Contraseña */}
          <div>
            <label htmlFor="password">
              Contraseña
            </label>
            <input type="password" placeholder="••••••••"/>
          </div>

          {/*Botón de Inicio de Sesión */}
          <button type="submit">Iniciar Sesión</button>
        </form>

        {/*Parte del Registro */}
        <div>
          <p>
            ¿No tienes cuenta?{' '}
            <Link to="/register">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;