"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const beeperController_1 = require("./beeperController");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// קבלת רשימת ביפרים של המשתמש
app.get('/beepers', beeperController_1.getBeeper);
app.get('/beepers/status/:status', beeperController_1.getBeeperBystatus);
// הוספת ביפר חדש
app.post('/beepers', beeperController_1.addBeeper);
app.get('/beepers/:id', beeperController_1.getBeeperById);
//לעדכון כל הפרטים
app.put('/beepers/:id', beeperController_1.updateBeeper);
//לעדכן סטטוס ספציפי בצורה הזאת:
// http://localhost:3000/beepers/6/status
// app.put('/beepers/:id/status', updateStatus);
//אותו דבר אבל עדכון אוטומטי לפי הסדר
app.put('/beepers/:id/status', beeperController_1.updateBeeperStatusAout);
app.delete('/beepers/:id', beeperController_1.deleteBeeper);
// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//דוגמה להוספה
// {
//     "id": 7,
//     "name": "beeper6",
//     "status": "manufactured",
//     "created_at": "11/01/2022",
//     "detonated_at": "11/01/2022",
//     "latitude": "12,34",
//     "longitude": "12,34"
// }
