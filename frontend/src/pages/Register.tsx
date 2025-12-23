import { Link } from "react-router-dom";
function Register() {
  
  return (
    <div>
      <div>
        {/*Mensaje de Registro */}
        <div>
          <h1> Crear Cuenta</h1>
          <p>únete a la comunidad</p>
        </div>

        {/**Formulario de Registro */}
        <form>
          {/**Username */}
          <div>
            <label htmlFor="username">
              Nombre de usuario
            </label>
            <input type="text" placeholder="usuario123"/>
          </div>

          {/**Email */}
          <div>
            <label htmlFor="email">
              Email
            </label>
            <input type="email" placeholder="ejemplo@email.com"/>
          </div>

          {/**Contraseña */}
          <div>
            <label htmlFor="password">
              Contraseña
            </label>
            <input type="password" placeholder="••••••••"/>
          </div>

          {/**Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword">
              Confirmar Contraseña
            </label>
            <input type="confirmPassword" placeholder="••••••••"/>
          </div>

          {/**Botón Submit */}
          <button type="submit">Crear Cuenta</button>

          {/**Link a Login */}
          <div>
            <p>
              ¿Ya tienes cuenta?{' '}
              <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;