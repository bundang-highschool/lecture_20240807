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
io.on('connection', async(socket)=>{
    console.log('connect user', socket.id)
})

module.exports = {
    app,
    server
}