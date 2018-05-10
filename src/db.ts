import { createConnection } from "typeorm";
import { Link } from "./backend/entities/link";
import { User } from "./backend/entities/user";
import { Vote } from "./backend/entities/vote";

export async function connecToDatabase() {

    const DATABASE_HOST = "localhost";
    const DATABASE_USER = "postgres";
    const DATABASE_PORT = 5432;
    const DATABASE_PASSWORD = "secret";
    const DATABASE_DB = "demo";

    const entities = [
        Link,
        User,
        Vote
    ];

    const conn = await createConnection({
        type: "postgres",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: entities,
        synchronize: true
    });

    // const getRepository = (entity: Function) => conn.getRepository(entity);

    //const movieRepository = conn.getRepository(User);
    // await movieRepository.save({
    //     email: "firstUser@test.com",
    //     password: "password" 
    // });

    // const linkRepository = conn.getRepository(Link);
    // await linkRepository.save({ 
    //     title: "title", 
    //     url: "url/test/iwa/typescript", 
    //     user: { id: 3 } ,
    //     //vote: { id: 1 }
    // });

    // // SELECT * FROM movies WHERE year=1977
    // const firstLink = await linkRepository.findOne({
    //     user: { id: 2 } 
    // });

    // if (firstLink) { 
    //     console.log(`User ${firstLink.title} inserted into the User table.`);
    // }
}