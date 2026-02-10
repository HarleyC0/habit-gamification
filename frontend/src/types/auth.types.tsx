export interface User {
    id: string;
    email: string;
    name: string;
}

// tipos para login de usuario
  
export interface LoginCredentials {
    email: string;
    password: string;
}
  

// respuesta del backend para login de usuario
export interface AuthResponse {
    user: User;
    token: string;
}


// tipos para registro de usuario //

export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string
}

// envio de datos al backend para registro de usuario
export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

// respuesta del backend para registro de usuario
export interface RegisterResponse {
    id: string;
    email: string;
    username: string;
    created_at: string;
}


// tipo para validacion de formulario de registro //

// estados de validacion 
export type AsyncStatus = 'idle' | 'checking' | 'available' | 'taken';
