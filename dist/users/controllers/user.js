"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_services_1 = require("../services/user.services");
class UserControllers {
    static createUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_services_1.Userservice.createUser(request.body);
                return response.status(result.code).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static verifyOTP(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = request.body;
                const result = yield user_services_1.Userservice.verifyOTP(email, otp);
                return response.status(result.code).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserControllers = UserControllers;
