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
}