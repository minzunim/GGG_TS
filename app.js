"use strict";
exports.__esModule = true;
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var nunjucks = require("nunjucks");
var dotenv = require("dotenv");
var mysql = require("mysql");
var jwt = require("jsonwebtoken");
var readSync = require("fs").readSync;
var sequelize = require("./models").sequelize;
var fs = require("fs");
var routes = require("./routes");
//process.env.COOKIE_SECRET없음
dotenv.config(); // process.env
//process.env.COOKIE_SECRET있음
var app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
sequelize
    .sync({ alter: true })
    .then(function () {
    console.log("데이터베이스 연결 성공");
})["catch"](function (err) {
    console.error(err);
});
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "upload")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { httpOnly: true, secure: false }
}));
// const connectionPool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PW,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   insecureAuth: true,
// });
//-------------------프론트쪽 임시구역-------------------------------------------
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/homeimg", function (req, res) {
    fs.readFile(__dirname + "/public/images/homePng4.png", function (err, data) {
        if (err) {
            return res.send("Error Occured");
        }
        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(data);
    });
});
//----------영상, 이미지--------------------------
app.get("/laundryicon", function (req, res) {
    fs.readFile(__dirname + "/public/images/laundryicon2.png", function (err, data) {
        if (err) {
            return res.send("Error Occured");
        }
        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(data);
    });
});
// 빨래신청 예시 이미지
app.get("/laundryimage", function (req, res) {
    fs.readFile(__dirname + "/public/images/laundry3.jpg", function (err, data) {
        if (err) {
            return res.send("Error Occured");
        }
        res.writeHead(200, { "Content-Type": "image/jpg" });
        res.end(data);
    });
});
app.get("/homevideo", function (req, res) {
    fs.readFile(__dirname + "/public/images/video.mp4", function (err, data) {
        if (err) {
            return res.send("Error Occured");
        }
        res.writeHead(200, { "Content-Type": "video/mp4" });
        res.end(data);
    });
});
app.get("/homevideo2", function (req, res) {
    fs.readFile(__dirname + "/public/images/video2.mp4", function (err, data) {
        if (err) {
            return res.send("Error Occured");
        }
        res.writeHead(200, { "Content-Type": "video/mp4" });
        res.end(data);
    });
});
//----------영상, 이미지--------------------------
// 손님 회원가입 & 로그인
app.get("/signup", function (req, res) {
    res.render("signup");
});
app.get("/login", function (req, res) {
    res.render("login");
});
app.get("/postlaundry", function (req, res) {
    res.render("postlaundry");
});
app.get("/mypage", function (req, res) {
    res.render("mypage");
});
app.get("/userreviews", function (req, res) {
    res.render("userreviews");
});
app.get("/signupboss", function (req, res) {
    res.render("signupboss");
});
app.get("/loginboss", function (req, res) {
    res.render("loginboss");
});
app.get("/boss", function (req, res) {
    res.render("boss");
});
app.get("/postreview", function (req, res) {
    res.render("postreview");
});
app.get("/bossreviews", function (req, res) {
    res.render("bossreviews");
});
//-------------------프론트쪽 임시구역-------------------------------------------
//라우터 연결
app.use("/api", routes);
app.use(function (req, res, next) {
    var error = new Error("".concat(req.method, " ").concat(req.url, " \uB77C\uC6B0\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."));
    error.status = 405;
    // res.status(404);
    next(error);
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; //에러로그 서비스에 넘김
    res.status(err.status || 500);
    res.render("error");
});
app.listen(app.get("port"), function () {
    console.log(app.get("port"), "번 포트에서 대기중");
});
