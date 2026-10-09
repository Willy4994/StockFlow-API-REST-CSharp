# StockFlow — API REST en C#

Proyecto académico de gestión de inventario desarrollado con ASP.NET Core Web API, Entity Framework Core, SQLite y React.

## Funcionalidades
- SELECT: listar y consultar productos.
- INSERT: registrar productos.
- UPDATE: modificar productos.
- DELETE: eliminar productos.
- Swagger/OpenAPI para probar la API.
- Interfaz web React conectada a la API.

## Tecnologías
- .NET 8 / C#
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- React + Vite

## Ejecutar la API
```bash
cd StockFlow.Api
dotnet restore
dotnet run
```
Swagger: `http://localhost:5094/swagger`

## Ejecutar el frontend
En otra terminal:
```bash
cd stockflow-web
npm install
npm run dev
```
Frontend: `http://localhost:5173`

## Endpoints
| Método | Endpoint | Acción |
|---|---|---|
| GET | `/api/Productos` | Listar productos |
| GET | `/api/Productos/{id}` | Consultar producto |
| POST | `/api/Productos` | Crear producto |
| PUT | `/api/Productos/{id}` | Actualizar producto |
| DELETE | `/api/Productos/{id}` | Eliminar producto |

## Video demostrativo
**Enlace del video (máximo 3 minutos):** PENDIENTE_DE_AGREGAR

## Autor
Willi Hernández Gabriel
