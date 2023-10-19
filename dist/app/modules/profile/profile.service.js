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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createProfile = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = data, profileData = __rest(data, ["role"]);
    const findUser = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!findUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    const { firstName, middleName, lastName } = findUser;
    // setting user fullname for profile
    profileData.fullName = firstName + ' ' + middleName + ' ' + lastName;
    const result = yield prisma_1.default.profile.create({
        data: profileData,
    });
    yield prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            role: role,
        },
    });
    return result;
});
const getSingleProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {

    const findUser = yield prisma_1.default.user.findUnique({
        where: {
            id: user.userId,
        },
        include: {
            Profile: true,
        },
    });
    if (!findUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    return findUser;
});
const updateProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield prisma_1.default.user.findUnique({
        where: {
            id: user.userId,
        },
        include: {
            Profile: true,
        },
    });
    if (!findUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    const result = yield prisma_1.default.profile.update({
        where: {
            id: findUser.Profile[0].id,
        },
        data: payload,
    });
    return result;
});
exports.ProfileService = {
    createProfile,
    getSingleProfile,
    updateProfile,
};
