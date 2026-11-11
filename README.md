# Gestor de Tareas

Proyecto full stack del módulo 2.7 (Diseño de Proyecto Innovador de Sitios Web).

**Stack:** React (Vite) · Node.js + Express · PostgreSQL (pgAdmin) · axios

## Estructura del proyecto

```
Gestor de tareas/
├── backend/                  -> API REST (Node.js + Express + pg)
│   ├── src/
│   │   ├── db.js             -> Conexión a PostgreSQL (Pool)
│   │   ├── controllers/
│   │   │   └── tareas.controller.js   -> Lógica CRUD
│   │   ├── routes/
│   │   │   └── tareas.routes.js       -> Mapa de rutas /api/tareas
│   │   └── app.js            -> Configura Express (cors, json, /api)
│   ├── server.js             -> Punto de entrada (puerto 4000)
│   ├── .env                  -> Credenciales de la base de datos
│   ├── .gitignore
│   └── package.json          -> npm run dev / npm start
│
└── frontend/                 -> Interfaz (React + Vite), puerto 5173
    └── src/
        ├── components/       -> TareaForm, TareaItem, TareaList
        ├── services/
        │   └── api.js        -> Cliente axios hacia http://localhost:4000/api
        ├── App.jsx           -> Componente principal (estado de las tareas)
        ├── App.css           -> Estilos
        └── main.jsx          -> Punto de entrada de React
```

## Base de datos (ya creada)

- **Servidor:** localhost:5432, usuario `postgres`
- **Base de datos:** `gestor_tareas`
- **Tabla:** `tareas` (id SERIAL PK, titulo VARCHAR(150) NOT NULL, descripcion TEXT,
  completada BOOLEAN DEFAULT false, fecha_creacion TIMESTAMP DEFAULT NOW())
- **Datos de prueba insertados:** 'Estudiar para el examen' y 'Practicar React'

Para verificarlo en pgAdmin 4: despliega **Servers → PostgreSQL 18 → Databases →
gestor_tareas → Schemas → public → Tables → tareas**, clic derecho → View/Edit Data →
All Rows. O con Query Tool: `SELECT * FROM tareas;`

Los scripts SQL usados (ya ejecutados) están al final de este README.

## Cómo ejecutar el proyecto

Se necesitan **dos terminales** abiertas en la carpeta del proyecto.

### Terminal 1 — Backend (puerto 4000)

```powershell
cd backend
npm run dev        # con nodemon (reinicia al guardar)
# o: npm start     # sin nodemon
```

Debe aparecer: `Servidor backend corriendo en http://localhost:4000`

Probar en el navegador o con Thunder Client / curl:

```
GET    http://localhost:4000/api/tareas
POST   http://localhost:4000/api/tareas        { "titulo": "Nueva tarea", "descripcion": "Opcional" }
PUT    http://localhost:4000/api/tareas/1      { "titulo": "...", "descripcion": "...", "completada": true }
DELETE http://localhost:4000/api/tareas/1
```

### Terminal 2 — Frontend (puerto 5173)

```powershell
cd frontend
npm run dev
```

Abrir http://localhost:5173 en el navegador.

### Cómo detener los servidores

Si los iniciaste desde una terminal: `Ctrl + C` en cada una.

Si quedaron procesos ocultos, encuentra los PID y mátalos:

```powershell
netstat -ano | findstr :4000
netstat -ano | findstr :5173
taskkill /PID <numero> /F
```

## Extensiones recomendadas para VS Code

Al abrir la carpeta, VS Code sugerirá instalar:

- **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
- **Thunder Client** (`rangav.vscode-thunder-client`) — probar la API sin salir de VS Code
- **Prettier - Code formatter** (`esbenp.prettier-vscode`)

## Credenciales (.env del backend)

El archivo `backend/.env` contiene la contraseña real de PostgreSQL (no incluida aquí por seguridad; cada quien pone la suya).
**Nunca** se sube a repositorios públicos (por eso está en `.gitignore`).
Si la contraseña de postgres cambia, hay que actualizar ese archivo y reiniciar el backend.

La base de datos indicada en el README no existía y la contraseña del `.env` estaba desactualizada.
El 11/11/2026 se corrigió `.env` (contraseña actualizada) y la base de datos `gestor_tareas` se volvió a crear
con la tabla `tareas` y los 2 registros de prueba (verificado con `psql`: `\d tareas` y `SELECT * FROM tareas`).

## Verificación realizada (11/11/2026)

- ✅ Base de datos `gestor_tareas` creada con la tabla `tareas` y 2 registros de prueba
- ✅ Credenciales de `.env` corregidas (`.env` no se sube al repositorio)
- ✅ Código del backend y frontend revisado contra las dos guías: coincide
- ✅ Backend probado: GET, POST, PUT, DELETE y validación 400 responden correctamente
- ✅ Frontend compila (`npm run build`) y `npm run dev` sirve la app en http://localhost:5173
- ✅ Flujo completo verificado: React → Express → PostgreSQL (2 tareas leídas desde la base)

## SQL usado para crear la base de datos

```sql
CREATE DATABASE gestor_tareas;   -- (creada el 11/11/2026)

CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    completada BOOLEAN DEFAULT false,
    fecha_creacion TIMESTAMP DEFAULT NOW()
);

INSERT INTO tareas (titulo, descripcion) VALUES
('Estudiar para el examen', 'Repasar los temas de la unidad 3'),
('Practicar React', 'Terminar el ejercicio de componentes');
```

## Errores comunes (de la guía)

| Síntoma | Causa | Solución |
|---|---|---|
| `password authentication failed` | DB_PASSWORD incorrecta en `.env` | Corregir `.env` y reiniciar backend |
| `connect ECONNREFUSED` | PostgreSQL detenido o DB_NAME/puerto mal | Verificar servicio `postgresql-x64-18` y que `gestor_tareas` exista |
| La página no muestra tareas | Backend caído o URL mal en `api.js` | `npm run dev` en backend (puerto 4000) |
| Error de CORS | Falta `app.use(cors())` | Revisar `src/app.js` (ya incluido) |
| `Port 4000 is already in use` | Ya hay un servidor corriendo | `netstat -ano \| findstr :4000` y `taskkill /PID <pid> /F` |
