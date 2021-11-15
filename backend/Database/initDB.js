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
        "Hola humanos, soy uno de los integrantes del equipo de trabajo creador de DayPost y os doy la bienvenida a nuestra plataforma! Me gusta programar (cuando mi código funciona, sino no tanto), aprender y esforzarme. Muchas gracias a HackaBoss por hacer esto posible.",
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
        "Mi nombre es Pablo, soy de Málaga y la razón por la que me registre en Daypost es porque soy un apasionado de la prensa digital. Soy estudiante de periodismo y me gustaría convertirme en editor profesional.",
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
        "Estoy más loco que una cabra, soy alegre, divertido, me encanta la música, la tecnología, el código, y todo lo que tenga que ver con vivir nuevas experiencias.
        Mi sueño es convertirme en  DayPoster, millonario y conocer a Elon Musk, Bill Gates y trabajar para HACK A BOSS.
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
        "Amante del sol, la playa y la buena música, me gusta viajar y conocer culturas milenarias. Amo hacer deporte y la comida vegana, el lenguaje inclusivo y las manifestaciones, manifestacionas y manifiestacionos.",
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
        "Me llamo Theresa,  soy de Algeciras Me gusta la fotografía y el cine. Me gustaría estar informada sobre las últimas noticias sobre política internacional  y es por eso que creé mi perfil en Daypost.",
        "admin",
        "${formatDate(new Date())}"
    )`);
    await connection.query(`
    INSERT INTO users(email, password, active, accName, userName, biography, role, createdAt)
    VALUES (
        "jonybravo69@hotmail.es",
        SHA2("123456789", 512),
        true,
        "John Cortés",
        "JonyMelavo",
        "Músico autodidacta, hippie por naturaleza, amante de Bob Dyland y su música. Sin embargo, mis rastas me asemejan más a Bob Marley. Daypost es mi vida y mi salud.",
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
        "Resultados de Elecciones 2021: cómo quedó el mapa político de Argentina tras la derrota del oficialismo.",
         "www.infobae.com",
          "Juntos se quedaron con el triunfo en 13 provincias, mientras que el Frente de Todos ganó 9 distritos, casi todos en el norte del país, y logró reducir la diferencia en Buenos Aires. Los partidos provinciales ganaron en dos.
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
        "Díaz, Colau, García, Oltra y Hamed paran el reloj de la política en un 'aquelarre' feminista que dibuja nuevas alianza.",
         "www.publico.es",
          "La vicepresidenta segunda del Gobierno pide al resto de líderes políticas 'caminar juntas' en un acto alejado de siglas, organizaciones políticas y ciclos electorales. Las cinco dirigentes hacen guiños constantes a la unidad y avanzan que volverán a reunirse en más ocasiones: 'Esto es el comienzo de algo que va a ser maravilloso'.",
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
        "¿Qué son los Pandora Papers y cómo involucra a presidentes y políticos de América Latina?",
         "www.bbc.com",
          "La filtración de 12 millones de documentos sobre las fortunas de personas poderosas, incluidos más de 330 políticos de 90 países, han revelado las complejas redes que se construyen en el mundo de los negocios para mover dinero.",
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
        "Rusia acusa a EEUU de intentar desestabilizar la situación en Cuba",
         "www.efe.com",
          "Rusia acusó hoy a Estados Unidos de intentar desestabilizar la situación en Cuba al fomentar los ánimos de protesta popular como en el caso de la convocatoria para este lunes de la Marcha Cívica por el Cambio.
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
        "La política de privacidad de Apple comienza a erosionar a sus competidoras.",
         "www.elpais.com",
          "El CEO de la compañía, Tim Cook, saca pecho de la arquitectura de seguridad de sus iPhones y de que los usuarios puedan elegir no ser rastreados, medida que habría costado unos 10.000 millones de dólares a Facebook, Snapchat, Twitter y YouTube.",
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
        "Detenido cuando iba a atracar por tercera vez la misma gasolinera en Castellón",
         "www.elpais.com",
          "El delincuente se encontró con la Policía Nacional revisando las cámaras de seguridad y fue reconocido por los propios empleados.
          A la tercera fue la vencida para la Policía Nacional de Castellón. El mismo atracador que había asaltado en dos ocasiones la misma gasolinera el jueves y viernes 9 y 10 de septiembre en la carretera de Almassora regresó al lugar del delito el lunes 13 con tan mala fortuna para él que dentro de la instalación estaban dos agentes del Cuerpo Nacional de Policía que pudieron detenerle, según fuentes conocedoras del caso.",
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
        "La red de tráfico de diamantes desata una tormenta política en Portugal.",
         "www.elpais.com",
          "La desarticulación de la trama que usaba la misión de la ONU en la República Centroafricana deja perplejos a las principales autoridades, que se enteraron por la prensa.",
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
          "Desde 2018, la AEPD ha interpuesto 295 sanciones y se ha convertido en una de las autoridades más activas de Europa
          La Agencia Española de Protección de Datos (AEPD) ha recaudado 23,46 millones en sanciones en los siete primeros meses del año, de acuerdo con el informe Privacy Insights 2021, elaborado por BDO, una de las mayores firmas globales de servicios profesionales, en el cual se analizan los distintos avances y recientes cambios regulatorios en materia de privacidad entre países y regiones de todo el mundo, así como su impacto en todo lo relativo a la transferencia y protección de datos e intercambio de información. ",
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
        "Un grupo de investigadores crea una red para desentrañar los secretos de la vida y “fabricarla”.",
         "www.elmundo.es",
          "¿Qué es la vida? ¿Cómo se originó? ¿Cómo evoluciona? ¿Es posible sintetizar? Los científicos plantean como primer objetivo desvelar el proteoma oscuro, las proteínas desconocidas que elabora un organismo.",
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
        "La ciencia descubre por qué hay personas que dicen escuchar voces del más allá",
         "www.20minutos.es",
          "Un grupo de científicos ha identificado los rasgos que pueden hacer que una persona sea más propensa a afirmar que escucha las voces de los muertos o del más allá, revela Science Alert.",
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
      VALUES("No me parece nada correcto como actúan los votantes, estos políticos nos estan robando!",
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
