CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"apellido_paterno" text NOT NULL,
	"apellido_materno" text NOT NULL,
	"correo" text NOT NULL,
	"contraseña" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_correo_unique" UNIQUE("correo")
);
