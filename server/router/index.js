const express = require('express')
const registerUser = require('../controller/registerUser.js')
const checkEmail = require('../controller/checkEmail.js')
const checkPassword = require('../controller/checkPassword.js')
const userDetails = require('../controller/userDetails.js')
const logout = require('../controller/logout.js')
const updateUserDetails = require('../controller/updateUserDetails.js')

const router = express()

router.get("/register",(req,res)=>{
    res.render("RegisterPage",{})
})

router.post("/register",registerUser) //회원가입하기
router.post("/email",checkEmail) //로그인(이메일체크)
router.post("/password",checkPassword) //로그인(비밀번호체크)

router.get("/user-details",userDetails) //쿠키에 있는 토큰으로 사용자 상세정보 조회
router.get("/logout",logout) //로그아웃

router.post("/update-user", updateUserDetails) //사용자이름+사진 변경

module.exports = router
