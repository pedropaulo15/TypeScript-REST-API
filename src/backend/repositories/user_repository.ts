import { getConnection } from "typeorm";
import { User } from "../entities/user";

export function getRepository(){
    const conn = getConnection();
    return conn.getRepository(User);
}