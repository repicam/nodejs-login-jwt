# API para gestionar posts con Login JWT
Proyecto backend donde gestionaremos un login/signin con JWT y los usuarios podrán hacer uso de un CRUD de posts para poder consumir la API en otros proyectos

## 1 Preparación de la API

### 1.1 Dependencias

#### 1.1.1 Desarollo
· nodemon: Para ver los cambios al guardar el fichero

· [standard](https://www.npmjs.com/package/standard): Paquete de reglas de eslint que te ayuda a solucionar errores en tu proyecto a partir de las reglas establecidas

#### 1.1.2 Proyecto
· express: Infraestructura de NodeJS

· cors: Modulo que permite recibir solicitudes de otros dominios

· mongoose: Modulo para conectar con nuestra base de datos. Usaremos ATLAS de MongoDB, un servicio en la nuba, sin necesidad de instalar nada 

· dotenv: Modulo que nos permite crear variables de entorno en un fichero .env

### 1.2 Scripts
· npm run dev: Activa el entorno de desarrollo, con la dependencia nodemon, que escucha los cambios y refresca el servidor

· npm run start: Activa el servidor final (simula la puesta en produccion)

· npm run lint: Ejecuta las reglas establecidas en el paquete instalado standard y te indica los errores que hay (pudiendo no ser bloqueantes para levantar el servidor)

## 2 Desarrollo de la API

### 2.1 Posts

#### 2.1.1 Modelado y conexion a MongoDB
Creamos el modelo Post para gestionar nuestras peticiones, pero al estar en una base de datos NoSQL, es un modelado de aplicacion y no de bbdd, por ello, si insertamos/modificamos objetos en mongo sin pasar por el servidor, podremos crear objetos del tipo que queramos, con los campos que queramos

Para la conexion a mongo, usaremos un fichero .env con los datos de conexion y conectaremos la aplicacion con la bbdd en la nube (ATLAS)

#### 2.1.2 CRUD (acciones)
· GET: Creamos las peticiones para obtener todos los posts (o con filter parameters e.g. "http://localhost:3000/api/v1/posts?favorito=true") u obtener uno por id (e.g. "http://localhost:3000/api/v1/posts/63654ae3c73cc90e731d08bd"))

· POST: Creamos la petición que creará nuevos posts (apuntando a http://localhost:3000/api/v1/posts) con un body del siguiente estilo

    {

        "contenido": "I love this",

        "favorito": true,

        "fecha": "2022-11-11"

    }

#### 2.1.3 Manejo de errores con middleware
A través de los middleware de express, podemos añadir un control de errores con el parámetro next. Esto llama a la siguiente ruta que coincide, pero si lanzamos un error, va al primer middleware que recibe errores (nuestro fichero errorHandler)