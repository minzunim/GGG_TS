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
var ReviewService = require("../service/reviews.service");
var ReviewsController = /** @class */ (function () {
    function ReviewsController() {
        var _this = this;
        this.reviewService = new ReviewService();
        //리뷰 작성
        this.createReview = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, grade, comment, laundryId, User, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, grade = _a.grade, comment = _a.comment;
                        laundryId = req.params.laundryId;
                        User = res.locals.user.id;
                        if (!grade) {
                            res.status(400).send({ errorMessage: "점수를 입력해주세요!" });
                        }
                        if (!comment) {
                            res.status(400).send({ errorMessage: "내용을 입력해주세요!" });
                        }
                        return [4 /*yield*/, this.reviewService.createReview(grade, comment, laundryId, User)];
                    case 1:
                        _b.sent();
                        // res.redirect("/api/laundry/1/reviews");
                        res.render("userreviews");
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        res.status(444).json({ errorMessage: error_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // 모든 리뷰 조회
        this.getAllReview = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var review;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reviewService.findAllReview()];
                    case 1:
                        review = _a.sent();
                        res.status(200).json({ data: review });
                        return [2 /*return*/];
                }
            });
        }); };
        // 유저 리뷰 조회 (지금 로그인 된 사용자것만 불러오기, 에러처리)
        this.getReview = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, review;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.params.user_id;
                        return [4 /*yield*/, this.reviewService.getReview(user_id)];
                    case 1:
                        review = _a.sent();
                        res.status(200).json({ data: review });
                        return [2 /*return*/];
                }
            });
        }); };
        //리뷰 수정
        this.updateReview = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var reviewId, _a, grade, comment, User, huhu, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        reviewId = req.params.reviewId;
                        _a = req.body, grade = _a.grade, comment = _a.comment;
                        User = res.locals.user.id;
                        return [4 /*yield*/, this.reviewService.updateReview(reviewId, grade, comment, User)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.reviewService.updateReview(reviewId, grade, comment, User)];
                    case 2:
                        huhu = _b.sent();
                        if (huhu.errormessage) {
                            return [2 /*return*/, res.json({ errormessage: huhu.errormessage })];
                        }
                        res.status(200).send({ message: "리뷰 수정 완료!" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        res.status(444).json({ errorMessage: error_2.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //리뷰 삭제
        this.deleteReview = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var reviewId, User, hihi, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        reviewId = req.params.reviewId;
                        User = res.locals.user.id;
                        return [4 /*yield*/, this.reviewService.deleteReview(reviewId, User)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ message: "리뷰 삭제 완료!" });
                        return [4 /*yield*/, this.reviewService.deleteReview(reviewId, User)];
                    case 2:
                        hihi = _a.sent();
                        if (hihi.errormessage) {
                            return [2 /*return*/, res.json({ errormessage: hihi.errormessage })];
                        }
                        res.status(200).send({ message: "리뷰 삭제 완료!" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        res.status(444).json({ errorMessage: error_3.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return ReviewsController;
}());
module.exports = ReviewsController;
