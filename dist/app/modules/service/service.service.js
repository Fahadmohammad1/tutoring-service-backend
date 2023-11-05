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
exports.ServicesOfService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const service_constants_1 = require("./service.constants");
const createService = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { timeSlots } = data, serviceData = __rest(data, ["timeSlots"]);
    const findService = yield prisma_1.default.service.findMany({
        where: {
            title: serviceData.title,
        },
    });
    //finding author by id using token
    const findAuthor = yield prisma_1.default.user.findUnique({
        where: {
            id: user.userId,
        },
        include: {
            Profile: true,
        },
    });
    if (!findAuthor) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Author does not exist');
    }
    findService.map(service => {
        if (findService && (service === null || service === void 0 ? void 0 : service.authorEmail) === serviceData.authorEmail) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This service is already available');
        }
    });
    if (serviceData)
        serviceData.userId = user.userId;
    serviceData.authorName = findAuthor === null || findAuthor === void 0 ? void 0 : findAuthor.Profile[0].fullName;
    serviceData.authorEmail = findAuthor === null || findAuthor === void 0 ? void 0 : findAuthor.email;
    serviceData.authorImage = findAuthor.Profile[0].avatar;
    const result = yield prisma_1.default.service.create({
        data: serviceData,
    });
    if (timeSlots) {
        timeSlots.map((slot) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma_1.default.timeSlots.create({
                data: {
                    serviceId: result.id,
                    date: slot.date,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                },
            });
        }));
    }
    return result;
});
const getAllServices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: service_constants_1.serviceSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        andConditions.push({
            AND: Object.entries(filterData).map(([field, value]) => {
                if (field === 'minPrice') {
                    return {
                        fee: {
                            gte: parseFloat(value),
                        },
                    };
                }
                if (field === 'maxPrice') {
                    return {
                        fee: {
                            lte: parseFloat(value),
                        },
                    };
                }
                return {
                    [field]: value,
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.service.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.service.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateService = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const findService = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    if (user.email !== (findService === null || findService === void 0 ? void 0 : findService.authorEmail) &&
        user.userId !== (findService === null || findService === void 0 ? void 0 : findService.userId)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden Access');
    }
    const result = yield prisma_1.default.service.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const findService = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    if (user.email !== (findService === null || findService === void 0 ? void 0 : findService.authorEmail) &&
        user.userId !== (findService === null || findService === void 0 ? void 0 : findService.userId)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden Access');
    }
    const result = yield prisma_1.default.service.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ServicesOfService = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};
