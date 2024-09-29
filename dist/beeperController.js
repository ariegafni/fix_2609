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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBeeperStatusAout = exports.getBeeperBystatus = exports.deleteBeeper = exports.updateBeeper = exports.updateStatus = exports.getBeeperById = exports.addBeeper = exports.getBeeper = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const dbPath = "./data/DB.json";
const getBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beepers = db.beepers || [];
        res.json(beepers);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve beepers' });
    }
});
exports.getBeeper = getBeeper;
const addBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, status, created_at, detonated_at, latitude, longitude } = req.body;
    try {
        const newBeeper = {
            id,
            name,
            status,
            created_at: new Date(created_at),
            detonated_at: new Date(detonated_at),
            latitude,
            longitude
        };
        const db = yield jsonfile_1.default.readFile(dbPath);
        db.beepers.push(newBeeper);
        yield jsonfile_1.default.writeFile(dbPath, db);
        res.status(201).json({ beeper: newBeeper });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add Beeper' });
    }
});
exports.addBeeper = addBeeper;
const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beeper = db.beepers.find((b) => b.id === parseInt(id));
        if (!beeper) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        res.json(beeper);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve beeper' });
    }
});
exports.getBeeperById = getBeeperById;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beeperIndex = db.beepers.findIndex((b) => b.id === parseInt(id));
        if (beeperIndex === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        db.beepers[beeperIndex] = Object.assign(Object.assign({}, db.beepers[beeperIndex]), { status });
        yield jsonfile_1.default.writeFile(dbPath, db);
        res.json(db.beepers[beeperIndex]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update beeper' });
    }
});
exports.updateStatus = updateStatus;
const updateBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, status, created_at, detonated_at, latitude, longitude } = req.body;
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beeperIndex = db.beepers.findIndex((b) => b.id === parseInt(id));
        if (beeperIndex === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        db.beepers[beeperIndex] = Object.assign(Object.assign({}, db.beepers[beeperIndex]), { name,
            status, created_at: new Date(created_at), detonated_at: new Date(detonated_at), latitude,
            longitude });
        yield jsonfile_1.default.writeFile(dbPath, db);
        res.json(db.beepers[beeperIndex]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update beeper' });
    }
});
exports.updateBeeper = updateBeeper;
const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beeperIndex = db.beepers.findIndex((b) => b.id === parseInt(id));
        if (beeperIndex === -1) {
            return res.status(404).json({ error: 'beeper not found' });
        }
        db.beepers.splice(beeperIndex, 1);
        yield jsonfile_1.default.writeFile(dbPath, db);
        res.json({ message: 'beeper deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete beeper' });
    }
});
exports.deleteBeeper = deleteBeeper;
const getBeeperBystatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.params;
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beepers = db.beepers.filter((b) => b.status === status);
        if (beepers.length === 0) {
            return res.status(404).json({ error: 'No beepers found with this status' });
        }
        res.json(beepers);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve beepers' });
    }
});
exports.getBeeperBystatus = getBeeperBystatus;
const updateBeeperStatusAout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let BeeperStatus;
    (function (BeeperStatus) {
        BeeperStatus["manufactured"] = "manufactured";
        BeeperStatus["assembled"] = "assembled";
        BeeperStatus["shipped"] = "shipped";
        BeeperStatus["deployed"] = "deployed";
    })(BeeperStatus || (BeeperStatus = {}));
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beeper = db.beepers.find((b) => b.id === parseInt(id));
        if (!beeper) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        const currentStatus = beeper.status;
        const statuses = Object.values(BeeperStatus);
        const currentIndex = statuses.indexOf(currentStatus);
        const nextIndex = (currentIndex + 1); //% statuses.length;  אם אני רוצה שזה יחזור 
        const nextStatus = statuses[nextIndex];
        beeper.status = nextStatus;
        yield jsonfile_1.default.writeFile(dbPath, db);
        res.json({ message: 'Beeper status updated', beeper });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update beeper status' });
    }
});
exports.updateBeeperStatusAout = updateBeeperStatusAout;
