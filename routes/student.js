const express = require("express")
const router = express.Router()
const Student = require("../models/student")

router.post('/add-student', async (req, res) => {
    const { name, phone, standard } = req.body;
    try{
        var val = Math.floor(1000 + Math.random() * 9000);
        const password = name + "@" + val;
        const userid = name + "@" + phone;
        let fees;
        if(std === 8){
            fees = 10000
        }
        else if(std === 9){
            fees = 150000
        }
        else if(std === 10){
            fees = 200000
        }
        const student = new Student({ name, phone, password, standard, fees, userid });
        await student.save();
        res.send({ success: 'Student added successfully' });
    }
    catch(err){
        res.send({ error: err })
    }
});

module.exports = router 