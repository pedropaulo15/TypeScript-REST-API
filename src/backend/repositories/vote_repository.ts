import { getConnection } from "typeorm";
import { Vote } from "../entities/vote";

export function getRepository(){
    const conn = getConnection();
    return conn.getRepository(Vote);
}