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

    const getRepository = (entity: Function) => conn.getRepository(entity);
    const movieRepository = conn.getRepository(User);

    // INSERT INTO movies VALUES ('Star Wars: Episode IV – A New Hope', 1977)
    // await movieRepository.save({
    //     email: "firstUser@test.com",
    //     password: "password" 
    // });

    linkRepository.save({ title: title, url: url, user: { id: userId } });


    // SELECT * FROM movies WHERE year=1977
    const firstUser = await movieRepository.findOne({
        email: "firstUser@test.com" 
    });
        if (firstUser) { 
            console.log(`User ${firstUser.email} inserted into the User table.`);
        }
}