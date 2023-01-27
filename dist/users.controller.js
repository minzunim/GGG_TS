var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UserService = require("../service/users.service");
var jwt = require("jsonwebtoken");
var _a = require("../config/secretKey"), secretKey = _a.secretKey, option = _a.option;
var UsersController = /** @class */ (function () {
    function UsersController() {
        var _this = this;
        this.userService = new UserService();
        //회원가입입니다.~~~
        this.createUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, nickname, password, confirmpassword, user, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, nickname = _a.nickname, password = _a.password, confirmpassword = _a.confirmpassword;
                        //비밀번호 확인
                        if (password !== confirmpassword) {
                            res
                                .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
                                .write("<script>alert('비밀번호가 일치하지 않습니다.'); history.back()</script>");
                            res.end();
                            //.render("alert", { error: "비밀번호가 일치하지 않습니다." }); // alert 페이지로 렌더링하는 방법
                        }
                        // 닉네임 포함여부
                        if (password.includes(nickname)) {
                            res
                                .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
                                .write("<script>alert('비밀번호에 닉네임이 포함되어 있습니다.'); history.back()</script>");
                            res.end();
                        }
                        return [4 /*yield*/, this.userService.createUser(email, nickname, password)];
                    case 1:
                        user = _b.sent();
                        res.status(201).render("login");
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        if (error_1.message === "Validation error") {
                            res
                                .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
                                .write("<script>alert('중복된 아이디나 닉네임이 있습니다.'); history.back()</script>");
                            res.end();
                        }
                        else {
                            res.status(400).json({ errormessage: error_1.message });
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //로그인 입니다.
        this.loginUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, user, token, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, this.userService.loginUser(email)];
                    case 1:
                        user = _b.sent();
                        if (email !== user.email || password !== user.password) {
                            res
                                .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
                                .write("<script>alert('이메일 또는 패스워드를 확인해주세요.'); history.back()</script>");
                        }
                        token = jwt.sign({ id: user.userId }, secretKey, option);
                        res.cookie("x_auth", token, {
                            httpOnly: true,
                            maxAge: 0.5 * 60 * 60 * 1000,
                        });
                        res.redirect("http://localhost:3000/mypage");
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        if (error_2.message === "Validation error") {
                            res
                                .status(404)
                                .json({ errorMessage: "중복된 이메일 또는 닉네임이 있습니다." });
                        }
                        if (error_2.message === "Cannot read properties of null (reading 'id')") {
                            res
                                .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
                                .write("<script>alert('이메일 또는 닉네임을 확인해주세요.'); history.back()</script>");
                        }
                        else {
                            res.status(400).json({ errormessage: error_2.message });
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //로그인 확인 입니다.
        this.loginInfo = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var User;
            return __generator(this, function (_a) {
                User = res.locals.user;
                res.json({ info: User });
                return [2 /*return*/];
            });
        }); };
        //로그아웃입니다.
        this.logoutUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.clearCookie("x_auth");
                return [2 /*return*/, res.status(200).send({ message: "로그아웃 완료" })];
            });
        }); };
    }
    return UsersController;
}());
module.exports = UsersController;
