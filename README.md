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

· bcrypt: Modulo que nos ayuda a hashear la contraseña del usuario y no tenerla en texto plano en la bbdd

· jsonwebtoken: Modulo que nos permite generar tokens para autenticacion de los usuarios

### 1.2 Scripts
· npm run dev: Activa el entorno de desarrollo, con la dependencia nodemon, que escucha los cambios y refresca el servidor

· npm run start: Activa el servidor final (simula la puesta en produccion)

· npm run lint: Ejecuta las reglas establecidas en el paquete instalado standard y te indica los errores que hay (pudiendo no ser bloqueantes para levantar el servidor)

## 2 Desarrollo de la API

### 2.1 Conexion a BBDD

Usaremos MongoDB con la dependencia de mongoose. Para la conexion a mongo, usaremos un fichero .env con los datos de acceso y conectaremos la aplicacion con la versión de MongoDB en la nube (ATLAS)
### 2.2 Posts

#### 2.2.1 Modelado
Creamos el modelo Post para gestionar nuestras peticiones, pero al estar en una base de datos NoSQL, es un modelado de aplicacion y no de bbdd, por ello, si insertamos/modificamos objetos en mongo sin pasar por el servidor, podremos crear objetos del tipo que queramos, con los campos que queramos. Esto es lo que sacrificamos usando una bbdd NoSQL

Ahora con la entrada de los usuarios, modificamos el modelo para que contenga el id del usuario que lo ha creado

#### 2.2.2 CRUD (acciones)
· GET: Creamos las peticiones para obtener todos los posts (o con filter parameters e.g. "http://localhost:3000/api/v1/posts?favorito=true") u obtener uno por id (e.g. "http://localhost:3000/api/v1/posts/63654ae3c73cc90e731d08bd"))

· POST: Creamos la petición que creará nuevos posts (apuntando a http://localhost:3000/api/v1/posts) con un body del siguiente estilo

    {

        "contenido": "I love this",

        "favorito": true,

        "fecha": "2022-11-11"

    }

· PATCH: Creamos la petición que modificará los posts (apuntando a http://localhost:3000/api/v1/posts/:id) con un body como el de arriba, pero sin pasar la fecha, ya que la fecha de creación del post no la modificaremos. Si nos la mandan, la eliminaremos del cuerpo de la petición

· DELETE: Creamos la petición que eliminará los posts (apuntando a http://localhost:3000/api/v1/posts/:id)

### 2.3 Manejo de errores con middleware
A través de los middleware de express, podemos añadir un control de errores con el parámetro next. Esto llama a la siguiente ruta que coincide, pero si lanzamos un error, va al primer middleware que recibe errores (nuestro fichero errorHandler). En este fichero comprobamos los CastError (al usar ids de mongo, tienen un formato específico) y ValidationError (en el modelo definimos que la propiedad contenido de los Posts es obligatoria y con una longitud mínima de 15 caracteres)

Por otro lado, tenemos el control de endpoints no registrados (nuestro fichero unknownEndpoint). Este va delante, en el middleware, del fichero de errores, porque será el primero que encuentre si no coincide ninguna ruta. Si los errores ya vienen en las rutas, con el lanzamiento del error (next(error)) y nuestro fichero que espera un error, lo podemos separar correctamente

### 2.4 Usuarios

#### 2.2.1 Modelado
Creamos el modelo User para saber quien ha creado los posts. En el modelo, crearemos un array de posts que ha creado, al igual que en los posts hemos relacionado el usuario

Cuando recuperamos un usuario, eliminamos la contraseña. Para eso usamos el método transform eliminando los campos que no queremos que se devuelvan en la petición

#### 2.2.2 CRUD (acciones)
· POST: Creamos la petición que creará nuevos usuarios (apuntando a http://localhost:3000/api/signin) con un body del siguiente estilo

    {

        "username": "repicam",

        "nombre": "Ivan Repiso",

        "password": "desarrollobackend"

    }

· POST: Creamos la petición que autorizará a los usuarios (apuntando a http://localhost:3000/api/login) con un body del siguiente estilo. Esto nos devuelve el username usado con el token de autorización, en caso de ser correcto

    {

        "username": "repicam",

        "password": "desarrollobackend"

    }

· PATCH: (EN PROGRESO...) Creamos la petición que permite modificar la contraseña a los usuarios (apuntando a http://localhost:3000/api/v1/users) con un body del siguiente estilo

    {

        "username": "repicam",

        "password": "desarrollobackend"

        "newPassword": "desarrollandobackend",

    }

