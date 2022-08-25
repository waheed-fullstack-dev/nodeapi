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
const uuid_1 = require("uuid");
const model_1 = require("../model");
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            try {
                const data = yield model_1.UserInstance.create(Object.assign(Object.assign({}, req.body), { id }));
                return res.json({ data, message: "Successfully created" });
            }
            catch (e) {
                console.log(e);
                return res.json({ message: "failed to create", status: 500, route: "/create" });
            }
        });
    }
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = req.query.limit || 10;
                console.log(limit);
                const offset = req.query.offset;
                const data = yield model_1.UserInstance.findAll({ where: {}, limit, offset });
                return res.json(data);
            }
            catch (e) {
                return res.json({ message: "failed to read", status: 500, route: "/read" });
            }
        });
    }
    userByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield model_1.UserInstance.findOne({ where: { id } });
                return res.json(record);
            }
            catch (e) {
                return res.json({ msg: "failed to read", status: 500, route: "/read/:id" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield model_1.UserInstance.findOne({ where: { id } });
                if (!record) {
                    return res.json({ msg: "Cannot find existing record" });
                }
                const updatedRecord = yield record.update({
                    email: record.getDataValue("email"),
                });
                return res.json({ record: updatedRecord });
            }
            catch (e) {
                return res.json({
                    message: "failed to read",
                    status: 500,
                    route: "/update/:id",
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield model_1.UserInstance.findOne({ where: { id } });
                if (!record) {
                    return res.json({ message: "Can not find existing record" });
                }
                const deletedRecord = yield record.destroy();
                return res.json({ record: deletedRecord });
            }
            catch (e) {
                return res.json({
                    message: "fail to read",
                    status: 500,
                    route: "/delete/:id",
                });
            }
        });
    }
}
exports.default = new UserController();
