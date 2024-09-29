import express from 'express';
import bodyParser from 'body-parser';
import { getBeeper,addBeeper,getBeeperById, updateBeeper,updateStatus,deleteBeeper,getBeeperBystatus,updateBeeperStatusAout } from './beeperController';
const app = express();
app.use(bodyParser.json())



// קבלת רשימת ביפרים של המשתמש
app.get('/beepers', getBeeper);

app.get('/beepers/status/:status', getBeeperBystatus);

// הוספת ביפר חדש
app.post('/beepers', addBeeper);

app.get('/beepers/:id', getBeeperById);
//לעדכון כל הפרטים
app.put('/beepers/:id', updateBeeper);

app.put('/beepers/:id/status', updateBeeperStatusAout);

app.delete('/beepers/:id', deleteBeeper);

//לעדכן סטטוס ספציפי בצורה הזאת:
// http://localhost:3000/beepers/6/status
// app.put('/beepers/:id/status', updateStatus);
//אותו דבר אבל עדכון אוטומטי לפי הסדר

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