# Welcome to DayPost!

    -It's a collaborative platform for news
    -Has a social media style, where users can follow other users, like and comment their posts.
    -Posts consist on:
        -Title
        -Description
        -Source
        -Topic
        -Image(optional)

# Database structure

_Users table:_

-   id
-   email
-   password
-   accName
-   userName
-   avatar
-   portrait
-   biography
-   active
-   deleted
-   role
-   registrationCode
-   recoverCode
-   createdAt
-   modifiedAt

_Posts table:_

-   id
-   idUser
-   title
-   description
-   source
-   topic
-   createdAt
-   modifiedAt

_Photos table:_

-   id
-   name
-   idPost
-   createdAt

_Likes table:_

-   id
-   idUser
-   idPost

_Comments table:_

-   id
-   idUser
-   idPost
-   content
-   createdAt
-   modifiedAt

# Endpoints

## User endpoints

> Blockquote -Get /users

-   POST - [/users] - Registra un nuevo usuario pendiente de activar.
-   POST - [/users/login] - Logea a un usuario retornando un token.
-   GET - [/users/:idUser] - Retorna información de un usuario concreto.
-   DELETE - [/users/:idUser] - Elimina un usuario.
-   GET - [/users/validate/:registrationCode] - Valida un usuario recién registrado.
-   PUT - [/users/email/:idUser] - Edita el email de un usuario.
-   PUT - [/users/biography/:idUser] - Edita la biografía de un usuario.
-   PUT - [/users/accName/:idUser] - Edita el nombre de cuenta de un usuario.
-   PUT - [/users/password/:idUser] - Edita la contraseña de un usuario.
-   PUT - [/users/recover/password] - Envia un correo con el código de reseteo de contraseña a un email.
-   PUT - [/users/reset/password] - Cambia la contraseña de un usuario.

-   `POST /users` - Registra un nuevo usuario pendiente de activar.
    -   **Cabecera auth:** No
    -   **Body:**
        -   email
        -   password
        -   username
    -   **Retorna:** mensaje que indica que el usuario ha sido creado y que se debe verificar la cuenta.

&nbsp;

-   `POST /users/login` - Hacer login y retornar un token.
    -   **Cabecera auth:** No
    -   **Body:**
        -   email
        -   password
    -   **Retorna:** un token.

&nbsp;

-   `GET /users/:idUser` - Obtener un usuario en concreto.
    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idUser
    -   **Retorna:** info de un usuario.

&nbsp;

-   `GET /users/validate/:registrationCode` - Validar a un usuario recién registrado.

    -   **Cabecera auth:** No
    -   **Queryparams:**
        -   registrationCode
    -   **Retorna:** mensaje que indica que el usuario ha sido activado.

&nbsp;

-   `PUT /users/email/:idUser` - Editar el email de un usuario.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idUser
    -   **Body:**
        -   email
    -   **Retorna:** mensaje que indica que el email del usuario ha sido modificado.

&nbsp;

-   `PUT /users/accName/:idUser` - Editar el nombre de cuenta de un usuario.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idUser
    -   **Body:**
        -   accName
    -   **Retorna:** mensaje que indica que el usuario ha sido modificado.

&nbsp;

-   `PUT /users/biography/:idUser` - Editar la biografía de un usuario.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idUser
    -   **Body:**
        -   biography
    -   **Retorna:** mensaje que indica que el usuario ha sido modificado.

&nbsp;

-   `PUT /users/password/:idUser` - Editar la contraseña de un usuario.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idUser
    -   **Body:**
        -   currentPass
        -   newPass
    -   **Retorna:** mensaje que indica que la contraseña ha sido modificada.

&nbsp;

-   `PUT /users/recover/password` - Enviar un correo con el código de reseteo de la contraseña.

    -   **Cabecera auth:** No
    -   **Body:**
        -   email
    -   **Retorna:** mensaje que indica que se ha enviado un mensaje de recuperación.

&nbsp;

-   `PUT /users/reset/password` - Cambiar la contraseña de un usuario con el código de reseteo.

    -   **Cabecera auth:** No
    -   **Body:**
        -   recoverCode
        -   newPass
    -   **Retorna:** mensaje que indica que la entrada ha sido votada.

&nbsp;

-   `DELETE /users/:idUser` - Eliminar un usuario.
    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idUser
    -   **Retorna:** mensaje que indica que el usuario ha sido eliminado.

## Endpoints of the posts

-   POST - [/posts] - Crea un nuevo post.
-   GET - [/posts] - Retorna el listado de entradas ordenado por likes.
-   GET - [/search/posts] - Retorna el listado de entradas
-   GET - [/posts/:idPost] - Retorna una entrada en concreto.
-   POST - [/posts/images/:idPost] - Añade una imagen a un post.
-   PUT - [/posts/title/:idPost] - Edita el titulo de un post.
-   PUT - [/posts/source/:idPost] - Edita la fuente de un post.
-   PUT - [/posts/description/:idPost] - Edita la descripción de un post.
-   DELETE - [/posts/:idPost] - Borra un post
-   DELETE - [/images/:idPost] - Elimina una foto de un post.
<!-- -   POST - [/entries/:idEntry/votes] - Da like a unn post. -->

-   `POST /posts` - Crear una post

    -   **Cabecera auth:** Sí
    -   **Body:**
        -   source
        -   title
        -   description
    -   **Retorna:** mensaje que indica que se ha creado un post.

&nbsp;

-   `GET /search/posts` - Obtener un listado de todos los posts.
    -   **Cabecera auth:** No
    -   **Querystring:**
        -   search
        -   order
        -   direction
        -   topic
        -   title
    -   **Retorna:** info de todos los posts.

&nbsp;

-   `GET /posts` - Obtener un listado de todos los posts ordenados por likes.
    -   **Cabecera auth:** No
    -   **Querystring:**
        -   order
        -   direction
        -   topic
        -   title
    -   **Retorna:** info de todos los posts.

&nbsp;

-   `GET /posts/:idPost` - Obtener un post en concreto.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idPost
    -   **Retorna:** info de un post.

&nbsp;

-   `DELETE /posts/:idPost` - Borrar un post.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idPost
    -   **Retorna:** mensaje que indica que el post se ha eliminado.

&nbsp;

-   `PUT /posts/title/:idPost` - Editar el título de un post.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idPost
    -   **Body:**
        -   newTitle
    -   **Retorna:** mensaje que indica que el título ha sido modificado.

&nbsp;

-   `PUT /posts/source/:idPost` - Editar el source(fuente) de un post.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idPost
    -   **Body:**
        -   newSource
    -   **Retorna:** mensaje que indica que la fuente ha sido modificada.

&nbsp;

-   `PUT /posts/description/:idPost` - Editar la descripción de un post.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idPost
    -   **Body:**
        -   newDescription
    -   **Retorna:** mensaje que indica que la descripción ha sido modificada.

&nbsp;

-   `POST /posts/images/:idPost` - Agregar una foto a un post.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idPost
    -   **Body:**
        -   photo
    -   **Retorna:** mensaje que indica que la foto ha sido añadida.

&nbsp;

-   `DELETE /images/:idPost` - Eliminar una foto de un post.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idPost
    -   **Retorna:** mensaje que indica que la foto ha sido eliminada.

&nbsp;

-   `GET /posts/photo/:idPost` - Obtener la imagen de un post.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idPost
    -   **Retorna:** imagen de un post.

&nbsp;

<!-- -   `POST /entries/:idEntry/votes` - Dar like una entrada.
-   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idEntry
    -   **Body:**
        -   vote
    -   **Retorna:** mensaje que indica que la entrada ha sido votada.

&nbsp; -->
