Aqui va toda la info relativa al proyecto que sea de ayuda para cualquier participante

//Endpoints básicos restantes:
users -» editUserImages, editUserPassword, recoverUserPass, resetUserPass

posts -» newPost, listPosts, getPost, editPost, deletePostPhoto, deletePost, addPostPhoro

!!! Antes de iniciar la Database, tenemos que CREAR la database en workbench (o similares)
Además, tenemos que rellenar el .env con los datos personales de cada uno de los integrantes.

Diario de bitácora, Martes 14-11, 9:00am -» Continuamos la aventura programadora.
10:08am -» Fallan las energías, han sido creados: Middleware authorized(checkea si un user esta autorizado a realizar acciones)
Controllers loginUser y getUser: Ya podéis logearos obteniendo un token de autorización
A parte de un template de error (porque estoy harto de escribir esas 3 lineas 24/7 all day long)
!!!IMPORTANTE!!!
A partir de ahora, cuando queramos obtener el id del user que hace el request (idReqUser) usaremos: req.auth.id
para lo cual, deberemos tener un user logeado (y creado), podéis crear vuestros propios user admin.

11:13am -> Agregadas las funciones relativas a guardar y borrar fotos en helpers
11:34am -> deleteUser -> Al borrar el usuario no borramos la password ni la reemplazamos por una random(recover de la cuenta??),
el user admin puede borrar usuarios(CON MOTIVOS DE TESTING, PODEMOS QUITAR ESTA FUNCIONALIDAD LUEGO.)

16/09: error en el validate de editUserPass, maybe el helper maybe el esquema, quien sabe tanto

Diario de Bitácora. 17-09. 10.57 -» Añadidas entradas aleatorias a la database para probar endpoints.
12.05 -» Creados los endpoints get, delete, edits de los posts. FALTA CREAR ESQUEMAS PARA SOURCE(POR EJEMPLO)
CONTINUAR POR LAS FOTOS, AÑADIR/QUITAR

CAMBIO Y CORTO

ACTUALIZACIÓN 20-09: TERMINADOS ENDPOINTS A FALTA DE LISTAR ENTRADAS -» FALTA CREAR #TOPICS EN LA DATABASE,
ACTUALIZAR TODO CODIGO QUE PUEDA REFERIRSE A LOS MISMOS. AÑADIR ENTRADAS DE LIKES A LA DATABASE PARA FUTURA FILTRACION

SE HA PEDIDO TUTORÍA, SE ACTUALIZARÁ ESTE MENSAJE CON FECHA Y HORA.

Nos ha quedado un código muy chulo!

Pablo espabila tio
