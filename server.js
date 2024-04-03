/* import {createServer} from 'node:http'

const server = createServer((request, response)=>{
    console.log('oi')
    response.write('oi')
    return response.end()
})

server.listen(3333) */

import fastify from "fastify";
//import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();
//const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply)=>{
    const {tittle, description, duration} = request.body

    await database.create({
        tittle: tittle,
        description: description,
        duration: duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async (request, reply)=>{
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply)=>{
    const videoID = request.params.id
    const {tittle, description, duration} = request.body

    await database.update(videoID, {
        tittle,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply)=>{
    const videoID = request.params.id

    await database.delete(videoID)

    return reply.status(204).send()
})

server.listen({
    port:3333,
});