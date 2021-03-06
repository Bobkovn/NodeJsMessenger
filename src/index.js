import http from "http"
import express from "express"
import * as io from "socket.io"
import * as path from 'path'

import "./db/mongo.js"

import WebSocketChats from "./websocket/chat.js"

import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import chatRoomRouter from "./routes/chat-room.js"

const app = express()

const port = process.env.PORT
app.set("port", port)

app.use(express.json())
app.use(express.static(path.resolve() + '/images'))
app.use(express.urlencoded({extended: false}))

app.use("/api/v0/auth", authRouter)
app.use("/api/v0/users", userRouter)

app.use("/api/v0/room", chatRoomRouter)


app.use('*', (req, res) => {
    return res.status(404).json({
        message: 'API endpoint doesn\'t exist'
    })
})

const server = http.createServer(app)
const socketIo = new io.Server(server)
global.io = socketIo.listen(server)
global.io.on('connection', WebSocketChats.connection)
server.listen(port)
server.on("listening", () => {
    console.log(`Listening on port: ${port}`)
})