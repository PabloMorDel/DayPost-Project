require('dotenv').config();
const faker = require('faker');
const getDB = require('./getDB.js');
const { formatDate, generateRandomValue } = require('../helpers.js');
const { lorem } = require('faker');

async function main() {
  let connection;
  try {
    connection = await getDB();
    await connection.query('DROP TABLE IF EXISTS likes;');
    await connection.query('DROP TABLE IF EXISTS photos;');
    await connection.query('DROP TABLE IF EXISTS comments;');
    await connection.query('DROP TABLE IF EXISTS posts;');
    await connection.query('DROP TABLE IF EXISTS users;');
    console.log('Deleted tables');

    //Users table
    await connection.query(`
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(512) NOT NULL,
            accName VARCHAR(100) DEFAULT "J.Doe",
            userName VARCHAR(100) NOT NULL UNIQUE,
            avatar VARCHAR(100),
            portrait VARCHAR(100),
            biography TEXT,
            active BOOLEAN DEFAULT false,
            deleted BOOLEAN DEFAULT false,
            role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
            registrationCode VARCHAR(100),
            recoverCode VARCHAR(100),
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME
        )
    `);
    //Posts table
    await connection.query(`
        CREATE TABLE posts (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            source VARCHAR(100) NOT NULL,
            topic ENUM("Uncategorized", "politics", "sports", "economy", "science", "society") NOT NULL,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME
        )
    `);
    //Photos table
    await connection.query(`
        CREATE TABLE photos (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            idPost INT NOT NULL,
            FOREIGN KEY (idPost) REFERENCES posts(id) ON DELETE CASCADE,
            createdAt DATETIME NOT NULL
        )
    `);
    //Likes table
    await connection.query(`
        CREATE TABLE likes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
            idPost INT NOT NULL,
            FOREIGN KEY (idPost) REFERENCES posts(id) ON DELETE CASCADE
        )
    `);
    //Comments table
    await connection.query(`
        CREATE TABLE comments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
            idPost INT NOT NULL,
            FOREIGN KEY (idPost) REFERENCES posts(id) ON DELETE CASCADE,
            content TEXT,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME
        )
    `);
    console.log('Created tables');
    //Create admin user
    await connection.query(`
    INSERT INTO users(email, password, active, accName, userName, biography, role, createdAt)
    VALUES (
        "pablomd137@gmail.com",
        SHA2("123456789", 512),
        true,
        "PabloDev",
        "PabloAdmin",
        "Hola humanos, soy uno de los integrantes del equipo de trabajo creador de DayPost y os doy la bienvenida a nuestra plataforma! Me gusta programar (cuando mi c??digo funciona, sino no tanto), aprender y esforzarme. Muchas gracias a HackaBoss por hacer esto posible.",
        "admin",
        "${formatDate(new Date())}"
    )`);
    await connection.query(`
    INSERT INTO users(email, password, active, accName, userName, biography, role, createdAt)
    VALUES (
        "pgrobredo@gmail.com",
        SHA2("123456789", 512),
        true,
        "ElMalaguita",
        "robredo007",
        "Mi nombre es Pablo, soy de M??laga y la raz??n por la que me registre en Daypost es porque soy un apasionado de la prensa digital. Soy estudiante de periodismo y me gustar??a convertirme en editor profesional.",
        "normal",
        "${formatDate(new Date())}"
    )`);
    await connection.query(`
    INSERT INTO users(email, password, active, accName, userName, biography, role, createdAt)
    VALUES (
        "dervyspr@gmail.com",
        SHA2("123456789", 512),
        true,
        "Dervys Perez",
        "dervyspr",
        "Estoy m??s loco que una cabra, soy alegre, divertido, me encanta la m??sica, la tecnolog??a, el c??digo, y todo lo que tenga que ver con vivir nuevas experiencias.
        Mi sue??o es convertirme en  DayPoster, millonario y conocer a Elon Musk, Bill Gates y trabajar para HACK A BOSS.
        ",
        "normal",
        "${formatDate(new Date())}"
    )`);
    await connection.query(`
    INSERT INTO users(email, password, active, accName, userName, biography, role, createdAt)
    VALUES (
        "hernestinacrack@gmail.com",
        SHA2("123456789", 512),
        true,
        "Hernestina Pereira",
        "Pereira_tina",
        "Amante del sol, la playa y la buena m??sica, me gusta viajar y conocer culturas milenarias. Amo hacer deporte y la comida vegana, el lenguaje inclusivo y las manifestaciones, manifestacionas y manifiestacionos.",
        "normal",
        "${formatDate(new Date())}"
    )`);
    await connection.query(`
    INSERT INTO users(email, password, active, accName, userName, biography, role, createdAt)
    VALUES (
        "thErEssItaLaRubBia@yahoo.net",
        SHA2("123456789", 512),
        true,
        "TheresitaStarK",
        "Theresia_Stark",
        "Me llamo Theresa,  soy de Algeciras Me gusta la fotograf??a y el cine. Me gustar??a estar informada sobre las ??ltimas noticias sobre pol??tica internacional  y es por eso que cre?? mi perfil en Daypost.",
        "admin",
        "${formatDate(new Date())}"
    )`);
    await connection.query(`
    INSERT INTO users(email, password, active, accName, userName, biography, role, createdAt)
    VALUES (
        "jonybravo69@hotmail.es",
        SHA2("123456789", 512),
        true,
        "John Cort??s",
        "JonyMelavo",
        "M??sico autodidacta, hippie por naturaleza, amante de Bob Dyland y su m??sica. Sin embargo, mis rastas me asemejan m??s a Bob Marley. Daypost es mi vida y mi salud.",
        "normal",
        "${formatDate(new Date())}"
    )`);
    //Creating random users
    // const USERS = 20;

    // for (let i = 0; i < USERS; i++) {
    //   const email = faker.internet.email();
    //   const password = faker.internet.password();
    //   const userName = faker.internet.userName();
    //   const biography = faker.lorem.paragraph();
    //   await connection.query(
    //     `
    //   INSERT INTO users (email, password, userName, biography, active, createdAt)
    //   VALUES (?, ?, ?, ?, true, ?)
    //   `,
    //     [email, password, userName, biography, formatDate(new Date())]
    //   );
    // }
    // const POSTS = 50;

    // for (let i = 0; i < POSTS; i++) {
    //   const title = faker.lorem.words(5);
    //   const source = faker.internet.url();
    //   const description = faker.lorem.paragraph(5);
    //   const createdAt = formatDate(new Date());
    //   const idUser = generateRandomValue(1, USERS + 1);
    //   await connection.query(
    //     `
    //     INSERT INTO posts (title, source, description, idUser, createdAt)
    //     VALUES(?, ?, ?, ?, ?)
    //   `,
    //     [title, source, description, idUser, createdAt]
    //   );
    // }
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "Resultados de Elecciones 2021: c??mo qued?? el mapa pol??tico de Argentina tras la derrota del oficialismo.",
         "www.infobae.com",
          "Juntos se quedaron con el triunfo en 13 provincias, mientras que el Frente de Todos gan?? 9 distritos, casi todos en el norte del pa??s, y logr?? reducir la diferencia en Buenos Aires. Los partidos provinciales ganaron en dos.
          ",
          "1",
          "${formatDate(new Date())}",
          "politics"
          )
      `
    );
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "D??az, Colau, Garc??a, Oltra y Hamed paran el reloj de la pol??tica en un 'aquelarre' feminista que dibuja nuevas alianza.",
         "www.publico.es",
          "La vicepresidenta segunda del Gobierno pide al resto de l??deres pol??ticas 'caminar juntas' en un acto alejado de siglas, organizaciones pol??ticas y ciclos electorales. Las cinco dirigentes hacen gui??os constantes a la unidad y avanzan que volver??n a reunirse en m??s ocasiones: 'Esto es el comienzo de algo que va a ser maravilloso'.",
          "2",
          "${formatDate(new Date())}",
          "politics"
          )
      `
    );
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "??Qu?? son los Pandora Papers y c??mo involucra a presidentes y pol??ticos de Am??rica Latina?",
         "www.bbc.com",
          "La filtraci??n de 12 millones de documentos sobre las fortunas de personas poderosas, incluidos m??s de 330 pol??ticos de 90 pa??ses, han revelado las complejas redes que se construyen en el mundo de los negocios para mover dinero.",
          "3",
          "${formatDate(new Date())}",
          "politics"
          )
      `
    );
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "Rusia acusa a EEUU de intentar desestabilizar la situaci??n en Cuba",
         "www.efe.com",
          "Rusia acus?? hoy a Estados Unidos de intentar desestabilizar la situaci??n en Cuba al fomentar los ??nimos de protesta popular como en el caso de la convocatoria para este lunes de la Marcha C??vica por el Cambio.
          ",
          "4",
          "${formatDate(new Date())}",
          "politics"
          )
      `
    );
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "La pol??tica de privacidad de Apple comienza a erosionar a sus competidoras.",
         "www.elpais.com",
          "El CEO de la compa????a, Tim Cook, saca pecho de la arquitectura de seguridad de sus iPhones y de que los usuarios puedan elegir no ser rastreados, medida que habr??a costado unos 10.000 millones de d??lares a Facebook, Snapchat, Twitter y YouTube.",
          "1",
          "${formatDate(new Date())}",
          "society"
          )
      `
    );
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "Detenido cuando iba a atracar por tercera vez la misma gasolinera en Castell??n",
         "www.elpais.com",
          "El delincuente se encontr?? con la Polic??a Nacional revisando las c??maras de seguridad y fue reconocido por los propios empleados.
          A la tercera fue la vencida para la Polic??a Nacional de Castell??n. El mismo atracador que hab??a asaltado en dos ocasiones la misma gasolinera el jueves y viernes 9 y 10 de septiembre en la carretera de Almassora regres?? al lugar del delito el lunes 13 con tan mala fortuna para ??l que dentro de la instalaci??n estaban dos agentes del Cuerpo Nacional de Polic??a que pudieron detenerle, seg??n fuentes conocedoras del caso.",
          "1",
          "${formatDate(new Date())}",
          "society"
          )
      `
    );
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "La red de tr??fico de diamantes desata una tormenta pol??tica en Portugal.",
         "www.elpais.com",
          "La desarticulaci??n de la trama que usaba la misi??n de la ONU en la Rep??blica Centroafricana deja perplejos a las principales autoridades, que se enteraron por la prensa.",
          "2",
          "${formatDate(new Date())}",
          "society"
          )
      `
    );
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "La AEPD ha recaudado 23,46 millones de euros en siete meses.",
         "cybersecuritynews.es",
          "Desde 2018, la AEPD ha interpuesto 295 sanciones y se ha convertido en una de las autoridades m??s activas de Europa
          La Agencia Espa??ola de Protecci??n de Datos (AEPD) ha recaudado 23,46 millones en sanciones en los siete primeros meses del a??o, de acuerdo con el informe Privacy Insights 2021, elaborado por BDO, una de las mayores firmas globales de servicios profesionales, en el cual se analizan los distintos avances y recientes cambios regulatorios en materia de privacidad entre pa??ses y regiones de todo el mundo, as?? como su impacto en todo lo relativo a la transferencia y protecci??n de datos e intercambio de informaci??n. ",
          "3",
          "${formatDate(new Date())}",
          "Uncategorized"
          )
      `
    );
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "Un grupo de investigadores crea una red para desentra??ar los secretos de la vida y ???fabricarla???.",
         "www.elmundo.es",
          "??Qu?? es la vida? ??C??mo se origin??? ??C??mo evoluciona? ??Es posible sintetizar? Los cient??ficos plantean como primer objetivo desvelar el proteoma oscuro, las prote??nas desconocidas que elabora un organismo.",
          "4",
          "${formatDate(new Date())}",
          "science"
          )
      `
    );
    await connection.query(
      `
        INSERT INTO posts (title, source, description, idUser, createdAt, topic)
        VALUES(
        "La ciencia descubre por qu?? hay personas que dicen escuchar voces del m??s all??",
         "www.20minutos.es",
          "Un grupo de cient??ficos ha identificado los rasgos que pueden hacer que una persona sea m??s propensa a afirmar que escucha las voces de los muertos o del m??s all??, revela Science Alert.",
          "5",
          "${formatDate(new Date())}",
          "science"
          )
      `
    );

    // const LIKES = 1000;

    // for (let i = 0; i < LIKES; i++) {
    //   const idUser = generateRandomValue(1, USERS + 1);
    //   const idPost = generateRandomValue(1, POSTS + 1);
    //   await connection.query(
    //     `
    //     INSERT INTO likes (idUser, idPost)
    //     VALUES(?, ?)`,
    //     [idUser, idPost]
    //   );
    // }
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(1, 2)`
    );
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(1, 3)`
    );
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(1, 4)`
    );
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(2, 1)`
    );
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(3, 5)`
    );
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(3, 7)`
    );
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(4, 1)`
    );
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(5, 1)`
    );
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(5, 2)`
    );
    await connection.query(
      `
      INSERT INTO likes (idUser, idPost)
      VALUES(6, 6)`
    );

    // const COMMENTS = 200;

    // for (let i = 0; i < COMMENTS; i++) {
    //   const content = faker.lorem.paragraph(2);
    //   const idUser = generateRandomValue(1, USERS + 1);
    //   const idPost = generateRandomValue(1, POSTS + 1);
    //   const createdAt = formatDate(new Date());
    //   await connection.query(
    //     `
    //     INSERT INTO comments (content, idUser, idPost, createdAt)
    //     VALUES(?, ?, ?, ?)`,
    //     [content, idUser, idPost, createdAt]
    //   );
    // }

    await connection.query(
      `
      INSERT INTO comments (content, idUser, idPost, createdAt)
      VALUES("No me parece nada correcto como act??an los votantes, estos pol??ticos nos estan robando!",
       "2",
       "1",
       "${formatDate(new Date())}")`
    );
    await connection.query(
      `
      INSERT INTO comments (content, idUser, idPost, createdAt)
      VALUES("Excelente noticia, gracias por compartirla",
       "4",
       "1",
       "${formatDate(new Date())}")`
    );
    await connection.query(
      `
      INSERT INTO comments (content, idUser, idPost, createdAt)
      VALUES("Yo me llamo Ralph",
       "5",
       "1",
       "${formatDate(new Date())}")`
    );
    await connection.query(
      `
      INSERT INTO comments (content, idUser, idPost, createdAt)
      VALUES("Me encanta ver a mujeres fuertes luchando por sus derechos, ARRIBA LAS MUJERES LIBRES Y VIVA CUBA!!!!!!!!",
       "3",
       "2",
       "${formatDate(new Date())}")`
    );

    console.log('New info has been added');
  } catch (error) {
    console.log(error.message);
    process.exit(0);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
}
main();
