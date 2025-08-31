# Proyecto API

Este es un proyecto de API basado en Deno, construido con Hono, Drizzle ORM y PostgreSQL. Proporciona un backend robusto para gestionar varias entidades relacionadas con la gestión de proyectos, incluyendo usuarios, proyectos, sprints, tareas y más.

## Tecnologías Utilizadas

*   **Deno**: Un entorno de ejecución seguro para JavaScript y TypeScript.
*   **Hono**: Un framework web ligero, rápido y moderno para construir APIs.
*   **Drizzle ORM**: Un ORM de TypeScript que proporciona una forma segura y de alto rendimiento para interactuar con su base de datos.
*   **PostgreSQL**: Un potente sistema de base de datos relacional de código abierto.

## Estructura del Proyecto

```
/
├── src/
│   ├── api/             # Rutas, controladores y servicios de la API
│   │   └── v1/
│   │       └── users/   # Lógica de la API relacionada con usuarios
│   ├── core/            # Configuración central del servidor
│   ├── db/              # Conexión a la base de datos y definiciones de esquemas
│   │   └── schemas/     # Archivos de esquema individuales para diferentes entidades
│   └── main.ts          # Punto de entrada principal de la aplicación (para tareas de Deno)
├── drizzle/             # Archivos de migración de la base de datos
├── docs/                # Documentación del proyecto
├── .env.example         # Ejemplo de variables de entorno
├── deno.json            # Configuración y tareas de Deno
├── drizzle.config.ts    # Configuración de Drizzle ORM
└── README.md            # Archivo README del proyecto
```

## Primeros Pasos

### Prerrequisitos

Antes de comenzar, asegúrese de tener lo siguiente instalado:

*   **Deno**: [Instalar Deno](https://deno.land/#installation)
*   **PostgreSQL**: [Instalar PostgreSQL](https://www.postgresql.org/download/)

### Variables de Entorno

Cree un archivo `.env` en la raíz de su proyecto basado en `.env.example` y configure su cadena de conexión a la base de datos:

```
DATABASE_URL="postgres://usuario:contraseña@host:puerto/nombre_base_datos"
```

Ejemplo:

```
DATABASE_URL="postgres://postgres:123456@localhost:5432/wkf_db"
```

### Instalación

1.  Clone el repositorio:

    ```bash
    git clone https://github.com/AlfonsoFichas-bit/api_wrkf.git
    cd api_wrkf
    ```

2.  Deno descargará automáticamente las dependencias cuando ejecute el proyecto.

### Migraciones de la Base de Datos

Para generar nuevas migraciones basadas en los cambios de su esquema:

```bash
deno task db:generate
```

Para aplicar las migraciones pendientes a su base de datos:

```bash
deno task db:migrate
```

### Ejecutar la API

Para iniciar el servidor de la API en modo de desarrollo:

```bash
deno task dev
```

El servidor será accesible en `http://localhost:8000` y se reiniciará automáticamente con los cambios en el código.

## Endpoints de la API (Usuarios)

La API actualmente proporciona los siguientes endpoints para el recurso de `usuarios`:

### Obtener todos los usuarios

*   **Endpoint**: `GET /api/v1/users`

### Obtener un usuario por ID

*   **Endpoint**: `GET /api/v1/users/:id`

### Crear un nuevo usuario

*   **Endpoint**: `POST /api/v1/users`
*   **Cuerpo de la Solicitud (JSON)**:

    ```json
    {
      "nombre": "John",
      "apellido_paterno": "Doe",
      "apellido_materno": "Smith",
      "correo": "john.doe@example.com",
      "contraseña": "your_password"
    }
    ```

## Contribución

¡Las contribuciones son bienvenidas! No dude en abrir incidencias o enviar solicitudes de extracción.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo `LICENSE` para obtener más detalles. (Nota: Un archivo `LICENSE` no está incluido en la estructura actual del proyecto, es posible que desee añadir uno.)