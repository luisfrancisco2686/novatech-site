# 🌐 Novatech - Sitio Web

Este proyecto corresponde al **sitio web de Novatech**, una aplicación
web moderna y funcional desarrollada con **HTML, CSS, JavaScript y
Node.js (Express)**.\
Incluye módulos para presentación de servicios, carrito de compras,
administración de productos y formulario de contacto con envío de
correos.

------------------------------------------------------------------------

## 🧩 Estructura del Proyecto

    novatech/
    │
    ├── index.html
    ├── servicios.html
    ├── carrito.html
    ├── admin-productos.html
    ├── contacto.html
    │
    ├── js/
    │   ├── main.js
    │   ├── services.js
    │   ├── cart.js
    │   ├── admin.js
    │
    ├── css/
    │   └── styles.css
    │
    ├── server.js
    ├── .env
    └── README.md

------------------------------------------------------------------------

## ⚙️ Instalación y Ejecución

### 1️⃣ Requisitos previos

-   Tener **Node.js** instalado (versión 16 o superior).
-   Tener acceso a la cuenta de **Gmail** (para validar la recepción de correos mediante formulario de contacto).
-   Clonar o descargar el repositorio.

``` bash
git clone https://github.com/usuario/novatech.git
cd novatech
```

### 2️⃣ Instalar dependencias

``` bash
npm install express body-parser nodemailer cors dotenv
```

### 3️⃣ Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente
contenido:

    EMAIL_USER=poligrancolombiano2025@gmail.com
    EMAIL_PASS=zjwohxizenrhfyqs

### 4️⃣ Ejecutar el servidor

``` bash
node server.js
```

Verás en consola:

    Servidor corriendo en http://localhost:3000

------------------------------------------------------------------------

## 💬 Módulo: Formulario de Contacto

Archivo principal: **contacto.html**\
Script asociado: **js/services.js**

### 🔹 Funcionamiento

1.  El usuario llena el formulario con los campos: nombre, apellidos,
    email, empresa, país y mensaje.\
2.  Al enviar, se ejecuta la función `initContactPage()` que:
    -   Valida que todos los campos obligatorios estén completos.
    -   Muestra un mensaje de error si falta alguno.
    -   Envía los datos al servidor usando `fetch('/send-email')`.
    -   Si el envío es exitoso, muestra un mensaje de confirmación.

### 🔹 En el servidor (`server.js`)

-   Se recibe la solicitud POST con los datos.
-   Se usa **Nodemailer** para enviar el correo al administrador.
-   Si el correo se envía correctamente, responde con `success: true`.
-   Si ocurre un error, devuelve un mensaje descriptivo.

------------------------------------------------------------------------

## 🛍️ Módulo: Servicios y Carrito de Compras

### Archivos:

-   `servicios.html`
-   `js/services.js`
-   `carrito.html`

### 🔹 Funcionamiento

1.  Los servicios se cargan dinámicamente desde un arreglo local o
    `localStorage`.
2.  Cada servicio tiene su botón **"Agregar al carrito"**.
3.  El carrito se guarda en `localStorage` con clave `novatech_cart_v1`.
4.  En `carrito.html`, se listan los productos agregados, mostrando
    nombre, precio y cantidad.
5.  Se puede eliminar un servicio o vaciar todo el carrito.

------------------------------------------------------------------------

## 🔐 Módulo: Administración de Productos

### Archivos:

-   `admin-productos.html`
-   `js/services.js`

### 🔹 Funcionamiento

1.  Se accede mediante un login simple validado en el navegador.
2.  Permite **crear, editar y eliminar** servicios almacenados en
    `localStorage`.
3.  Los cambios se reflejan automáticamente en la página de servicios.

------------------------------------------------------------------------

## 🌍 Módulo: Página Principal

Archivo: `index.html`\
Contiene la presentación principal de Novatech, con un encabezado, menú
de navegación, secciones informativas y enlaces a los demás módulos
(servicios, contacto, etc.).

------------------------------------------------------------------------

## 🧠 Lógica Interna

El archivo **js/services.js** centraliza gran parte de la lógica del
proyecto:

-   Carga inicial de servicios (`DEFAULT_SERVICES_KEY`).
-   Manejo del carrito (`CART_KEY`).
-   Funciones de interacción (modales, eventos, validaciones, envío de
    formularios, etc.).

------------------------------------------------------------------------

## 📬 Envío de Correos

El servidor utiliza **Nodemailer** con **SMTP de Gmail**.

Ejemplo de correo enviado:

    De: Juan Pérez <juanperez@gmail.com>
    Para: novatech@gmail.com
    Asunto: Nuevo mensaje de contacto - Juan Pérez
    Mensaje:
    Nombre: Juan Pérez
    Email: juanperez@gmail.com
    Empresa: Tech S.A.S
    País: Colombia
    Mensaje: Estoy interesado en sus servicios.

------------------------------------------------------------------------

## 💡 Recomendaciones

-   Siempre iniciar el servidor antes de probar el formulario de
    contacto.
-   Si el correo no se envía, verificar que:
    -   Las credenciales del `.env` sean correctas.
    -   Gmail permita el acceso mediante aplicaciones seguras (usar
        contraseña de aplicación).
-   Para desplegar en Azure o Render, configurar las variables de
    entorno en el panel correspondiente.

------------------------------------------------------------------------

## 👩‍💻 Créditos

Desarrollado por **Estudiantes Politécnico Grancolombiano**\
Proyecto educativo para fines de práctica web.

------------------------------------------------------------------------
