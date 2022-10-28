# API para gestionar posts con Login JWT
Proyecto backend donde gestionaremos un login/signin con JWT y los usuarios podrán hacer uso de un CRUD de posts para poder consumir la API en otros proyectos

## 1 Desarrollo de la API

### 1.1 Dependencias

#### 1.1.1 Desarollo
· nodemon: Para ver los cambios al guardar el fichero

· [standard](https://www.npmjs.com/package/standard): Paquete de reglas de eslint que te ayuda a solucionar errores en tu proyecto a partir de las reglas establecidas

#### 1.1.2 Proyecto
· express: Infraestructura de NodeJS

· cors: Modulo que permite recibir solicitudes de otros dominios

· mongoose: Modulo para conectar con nuestra base de datos. Usaremos ATLAS de MongoDB, un servicio en la nuba, sin necesidad de instalar nada 

### 1.2 Scripts
· npm run dev: Activa el entorno de desarrollo, con la dependencia nodemon, que escucha los cambios y refresca el servidor

· npm run start: Activa el servidor final (simula la puesta en produccion)

· npm run lint: Ejecuta las reglas establecidas en el paquete instalado standard y te indica los errores que hay (pudiendo no ser bloqueantes para levantar el servidor)

### 1.2 Modelado y conexion a MongoDB
Creamos el modelo Post para gestionar nuestras peticiones, pero al estar en una base de datos NoSQL, es un modelado de aplicacion y no de bbdd, por ello, si insertamos/modificamos objetos en mongo sin pasar por el servidor, podremos crear objetos del tipo que queramos, con los campos que queramos

Para la conexion a mongo, usaremos un fichero .env con los datos de conexion y conectaremos la aplicacion con la bbdd en la nube (ATLAS)