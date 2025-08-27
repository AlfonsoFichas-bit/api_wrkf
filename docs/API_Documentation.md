# Documentación de la API

Este documento describe la configuración, estructura y uso de la API.

## Tecnologías Utilizadas

- **Deno**: Entorno de ejecución para TypeScript/JavaScript.
- **Hono**: Framework web para construir la API.
- **Drizzle ORM**: ORM de TypeScript para interactuar con la base de datos.
- **PostgreSQL**: Base de datos relacional.

## Estructura del Proyecto

El proyecto se ha reestructurado para separar responsabilidades y mejorar la escalabilidad. La estructura actual es la siguiente:

```
/
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── users/
│   │       │   ├── users.controller.ts
│   │       │   ├── users.service.ts
│   │       │   └── users.routes.ts
│   │       └── index.ts
│   ├── core/
│   │   ├── server.ts
│   │   └── config.ts
│   ├── db/
│   │   ├── schema.ts
│   │   └── db.ts
│   └── main.ts
├── drizzle/
│   └── ...
├── .env
├── .gitignore
├── deno.json
└── drizzle.config.ts
```

## Migraciones de la Base de Datos

Para gestionar las migraciones de la base de datos, se han configurado las siguientes tareas de Deno:

- **Generar una nueva migración**:
  ```bash
  deno task db:generate
  ```

- **Aplicar las migraciones pendientes**:
  ```bash
  deno task db:migrate
  ```

## Ejecutar la API

Para iniciar el servidor en modo de desarrollo, ejecuta el siguiente comando:

```bash
deno task dev
```

El servidor se iniciará en `http://localhost:8000` y se reiniciará automáticamente con cada cambio en el código.

## Endpoints de la API

La API actualmente expone los siguientes endpoints para el recurso de `users`:

### Obtener todos los usuarios

- **Endpoint**: `GET /api/v1/users`
- **Ejemplo con `curl`**:
  ```bash
  curl http://localhost:8000/api/v1/users
  ```

### Obtener un usuario por ID

- **Endpoint**: `GET /api/v1/users/:id`
- **Ejemplo con `curl`**:
  ```bash
  curl http://localhost:8000/api/v1/users/1
  ```

### Crear un nuevo usuario

- **Endpoint**: `POST /api/v1/users`
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "John",
    "apellido_paterno": "Doe",
    "apellido_materno": "Smith",
    "correo": "john.doe@example.com",
    "contraseña": "your_password"
  }
  ```
- **Ejemplo con `curl`**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"nombre": "John", "apellido_paterno": "Doe", "apellido_materno": "Smith", "correo": "john.doe@example.com", "contraseña": "your_password"}' http://localhost:8000/api/v1/users
  ```
