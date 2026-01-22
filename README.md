# habit-gamification (En desarrollo)

Una plataforma fullstack de productividad que aplica mecánicas de gamificación para ayudar a los usuarios a desarrollar y mantener hábitos de forma estructurada y motivadora.
La aplicación transforma los objetivos personales en progreso medible, utilizando niveles, puntos y clasificaciones para fomentar la constancia.

## 🚀 Features (MVP Core)
- Autenticación de usuarios y gestión de perfiles personales
- Creación, edición y seguimiento de hábitos diarios
- Sistema de gamificación basado en la finalización de hábitos (puntos, niveles, progreso)
- Clasificación pública por categorías de hábitos
- Almacenamiento persistente de datos y seguimiento del progreso del usuario

## 🧠 Tech Stack
**Frontend**
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

**Backend**
- Python + FastAPI (REST API)
- Authentication and business logic layer

**Database**
- Supabase (PostgreSQL)

## 🏗️ Arquitectura (Alto Nivel)
- El frontend consume las API REST expuestas por el backend
- El backend gestiona la autenticación, la lógica de hábitos y el cálculo del progreso
- Supabase se utiliza para el almacenamiento persistente y la gestión de datos de usuarios
