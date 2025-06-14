Hecho por Luis Angel Cordero Garrido

Plataforma de Comercio Electrónico
Aplicación de ecommerce de venta de guitarras full-stack construida con Next.js (frontend) y Node.js + Express (backend). Incluye autenticación JWT, gestión de productos para administradores y carrito de compras para usuarios.

Funcionalidades

Registro e inicio de sesión con JWT

Acceso basado en roles (usuario / administrador)

Panel de administración para crear, actualizar y eliminar productos

Listado de productos con búsqueda y paginación

Carrito de compras con función de agregar productos

Interfaz responsiva usando TailwindCSS

Tecnologías Utilizadas

Backend

Node.js

Express

MySQL 

JWT para autenticación

CORS, bcrypt

Frontend

Next.js (App Router)

TailwindCSS

React Context para el estado global del usuario y carrito

Heroicons para íconos

Yup + React Hook Form para validación de formularios

Como usar:

Clonar el repositorio

git clone https://github.com/Luiscorga/ecommerce-fullstack.git
cd ecommerce-fullstack

 Configuración del Backend (Node.js + Express)
 Instalar dependencias

cd server
npm install

 Configura el entorno
Crea un archivo .env dentro de la carpeta backend/:

PORT = 8080
DB_PASS = Password de su usuario
JWT_SECRET = Codigo secreto para JWT
DB_HOST = Su host de sql
DB_USER = Usuario de sql
DB_NAME = Nombre de la base de datos (ecommerce si la creo con el script brindado)

Inicializar la base de datos MySQL

Ejecutar este script en MySQL:


        CREATE DATABASE IF NOT EXISTS ecommerce;

        USE ecommerce;

        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;

        CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        color VARCHAR(50),
        stock INT DEFAULT 0,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        -- Insert an admin user (you'll hash this in Node.js before inserting)
        -- Just a placeholder for now
        INSERT INTO users (email, password, role)
        VALUES ('admin@example.com', '$2b$10$YrofGmCuFoxlzfbJTFfcE.oo54R75g8st8UmuF/tI2hHcXNOMu0OW', 'admin');

        INSERT INTO products (brand, model, description, price, color, stock, image_url)
        VALUES 
        ('Fender', 'Stratocaster', 'Classic tone and playability. Alder body and maple neck.', 1199.99, 'Sunburst', 10, 'https://example.com/images/fender-strat.jpg'),

        ('Gibson', 'Les Paul Standard', 'Iconic single-cut design with powerful humbuckers.', 2499.00, 'Cherry Sunburst', 5, 'https://example.com/images/gibson-lespaul.jpg'),

        ('Ibanez', 'RG550', 'Fast neck and aggressive sound for shredders.', 999.50, 'Purple Neon', 8, 'https://example.com/images/ibanez-rg550.jpg'),

        ('PRS', 'Custom 24', 'Versatile sound and stunning finish. Coil-splitting options included.', 3499.00, 'Blue Burst', 3, 'https://example.com/images/prs-custom24.jpg'),

        ('Yamaha', 'Pacifica 112V', 'Affordable entry-level guitar with solid performance.', 329.99, 'Black', 15, 'https://example.com/images/yamaha-pacifica.jpg');



Ejecutar el backend

npm run dev
El backend ahora debería estar disponible en http://localhost:8080.

Configuración del Frontend (Next.js)
Instalar dependencias

cd client
npm install

Ejecutar el frontend
npm run dev
Abre el navegador y visita http://localhost:3000

Usuarios de prueba
Administrador

email: admin@example.com
password: admin123

Crear usuario regular

email: user@example.com
password: user123


Estructura de Carpetas

backend/
  ├── routes/
  ├── controllers/
  ├── models/
  ├── middleware/
  └── server.js

frontend/
  ├── app/
  ├── components/
  ├── context/
  ├── hooks/
  └── utils/
