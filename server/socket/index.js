const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')
const UserModel = require('../models/UserModel')

const app = express()

/**
 * 소켓통신을 위한 서버띄우기
 */
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})

/**
 * 소켓서버 송수신
 */
const onlineUser = new Set()

io.on('connection', async(socket)=>{
    console.log('connect user', socket.id)
    const token = socket.handshake.auth.token
    const user = await getUserDetailsFromToken(token) //토큰을 통해 사용자조회

    //방만들기
    socket.join(user?._id)
    onlineUser.add(user?._id)

    //첫 메세지 보내기
    io.emit('onlineUser',Array.from(onlineUser))
    
    //접속끊기
    socket.on('disconnect',()=>{
        onlineUser.delete(user?._id) //접속자1명 빠져나갔으니까 1명삭제
        console.log('diconnect user', socket.id)
    })
})

module.exports = {
    app,
    server
}