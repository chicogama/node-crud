import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
    #videos = new Map()

    async list(search){
        let videos

        if(search){
            videos = await sql`select*from videos where videos.tittle like ${'%'+search+'%'}`
        }else{
            videos = await sql`select*from videos`
        }

        return videos
    }

    async create(video){
        const videoID = randomUUID()

        const {tittle, description, duration} = video

        await sql`insert into videos (id, tittle, description, duration) VALUES (${videoID}, ${tittle}, ${description}, ${duration})`
    }

    async update(id, video){
        const {tittle, description, duration} = video
        
        await sql`update videos set tittle = ${tittle}, description = ${description}, duration = ${duration} where id = ${id}`
    }

    async delete(id){
        await sql`delete from videos where id = ${id}`
    }
}