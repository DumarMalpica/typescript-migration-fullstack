<div align="center">

# 🏢 Taller API RESTFul
### Empresas & Empleados

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Seguridad-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-Docs-85EA2D?style=flat-square&logo=swagger&logoColor=black)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render&logoColor=black)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

**Monorepo full-stack · TypeScript · Node.js + Express · React + Vite · MongoDB Atlas**  
Seguridad con JSON Web Tokens · Documentación con Swagger UI

</div>

---

## Descripción

Monorepo full-stack para la gestión de **Empresas** y **Empleados**, desarrollado para la asignatura Electiva II. Implementa una API RESTFul con autenticación JWT y documentación Swagger, consumida por una SPA en React.

La relación entre entidades es de **uno a muchos**: una empresa puede tener muchos empleados, pero un empleado pertenece a una sola empresa.

---

## Características

- **CRUD completo** para Empresas y Empleados
- **Autenticación JWT** — tokens con expiración de 1 hora y flujo manual de 3 pasos
- **Control de roles** — `admin` (lectura/escritura) · `user` (solo lectura)
- **Relación referencial** — Empleado vinculado a Empresa por ObjectId
- **Swagger UI** — documentación interactiva en `/api/docs`
- **MongoDB Atlas** — persistencia en la nube
- **TypeScript** — tipado estático en backend y frontend
- **Desplegado** en Render (backend) + Vercel (frontend)

---

## Arquitectura

```
frontend/ (React + Vite + TypeScript)
    │  HTTP / HTTPS
    ▼
backend/ (Node.js + Express + TypeScript)  ← Render
    │
    ├── Middlewares: verifyToken · soloAdmin
    │
    ├── /api/auth      → routes-auth.ts      → controll-auth.ts
    ├── /api/empresas  → routes-empresa.ts   → controll-empresa.ts   → Empresa (Mongoose)
    └── /api/empleados → routes-empleados.ts → controll-empleados.ts → Empleado (Mongoose)
                                                                             │
                                                                     MongoDB Atlas
```

---

## Estructura del proyecto

```
taller-api/
├── backend/
│   ├── index.ts                      # Punto de entrada
│   ├── swagger.ts                    # Configuración OpenAPI 3.0
│   ├── tsconfig.json                 # Configuración TypeScript
│   ├── .env                          # Variables de entorno
│   ├── drivers/
│   │   └── connect-db.ts             # Conexión a MongoDB Atlas
│   ├── models/
│   │   ├── empresa.ts                # Esquema Mongoose + interface IEmpresa
│   │   └── empleados.ts              # Esquema Mongoose + interface IEmpleado
│   ├── controllers/
│   │   ├── controll-auth.ts          # Login y generación de JWT
│   │   ├── controll-empresa.ts       # CRUD Empresa
│   │   └── controll-empleados.ts     # CRUD Empleado
│   ├── middlewares/
│   │   ├── auth.ts                   # Middleware verifyToken
│   │   └── roles.ts                  # Middleware soloAdmin
│   └── routes/
│       ├── routes-auth.ts            # POST /api/auth/login
│       ├── routes-empresa.ts         # CRUD /api/empresas
│       └── routes-empleados.ts       # CRUD /api/empleados
│
└── frontend/
    └── src/
        ├── main.tsx                  # Punto de entrada React
        ├── App.tsx                   # Rutas protegidas
        ├── vite-env.d.ts             # Tipos para import.meta.env
        ├── context/
        │   └── AuthContext.tsx       # Estado global de autenticación
        ├── pages/
        │   ├── Login.tsx             # Flujo de 3 pasos para obtener el JWT
        │   └── Dashboard.tsx         # Panel principal con sidebar
        └── components/
            ├── Empresas.tsx          # CRUD de empresas
            ├── Empleados.tsx         # CRUD de empleados
            ├── GlassCard.tsx         # Componente de tarjeta
            └── PremiumButton.tsx     # Componente de botón
```

---

## Endpoints

### Autenticación (pública)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Obtener token JWT |
| `GET` | `/ping` | Health check |
| `GET` | `/api/docs` | Swagger UI |

### Empresas (requiere JWT)

| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| `GET` | `/api/empresas` | user / admin | Listar todas |
| `GET` | `/api/empresas/:id` | user / admin | Obtener por ID |
| `POST` | `/api/empresas` | **admin** | Crear empresa |
| `PUT` | `/api/empresas/:id` | **admin** | Actualizar empresa |
| `DELETE` | `/api/empresas/:id` | **admin** | Eliminar empresa |

### Empleados (requiere JWT)

| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| `GET` | `/api/empleados` | user / admin | Listar todos (con empresa) |
| `GET` | `/api/empleados/:id` | user / admin | Obtener por ID |
| `POST` | `/api/empleados` | **admin** | Crear empleado |
| `PUT` | `/api/empleados/:id` | **admin** | Actualizar empleado |
| `DELETE` | `/api/empleados/:id` | **admin** | Eliminar empleado |

---

## Seguridad JWT

```
1. POST /api/auth/login  →  { username, password }
2. Servidor valida credenciales y devuelve el token JWT
3. El cliente incluye el token en cada petición:
   Authorization: Bearer <token>
4. verifyToken valida firma y expiración
5. soloAdmin verifica el rol para operaciones de escritura
```

---

## Ejecución local

**Prerrequisitos:** Node.js >= 18

```bash
# 1. Instalar dependencias
cd backend && npm install
cd ../frontend && npm install
```

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
# API:    http://localhost:3000
# Swagger: http://localhost:3000/api/docs
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
# App: http://localhost:5173
```


---


