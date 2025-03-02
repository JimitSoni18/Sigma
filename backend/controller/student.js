const Student = require("../models/student")
const Exam = require("../models/examschema")
const time = require("../models/timetable")
const querystring = require('querystring')
const url = require('url')


var val = Math.floor(1000 + Math.random() * 9000);

exports.Addstudent = async (req, res) => {
    const { name, fatherNo, motherNo, selfNo, standard, fees } = req.body;
    try{
        const student = new Student({ name, fatherNo, motherNo, selfNo, standard, fees, });
        await student.save();
        res.status(201).json({ success: true,msg: "Student added successfully"});
    }
    catch(err){
        res.status(400).json({success: false,msg : err.message});
    }
};

exports.Getstudents = async (req,res)=>
{
    const parsedUrl = url.parse(req.url);
    const queryParams = querystring.parse(parsedUrl.query);
    console.log({queryParams})
    try{
        const students =await Student.find().populate('standard').exec()
        res.status(200).json({success: true, list:students, count: students?.length});
    } catch(error){
        res.status(400).json({success: false,msg : error.message});
    }
};

exports.Addtimetable = async (req,res) =>
{
    const{subject,chapter,date,std,desc} = req.body;
    try{
        const timetabl = new time({ subject,chapter, date, std, desc});
        await timetabl.save();
        res.status(201).json({ message: "Student added successfully"})
    }
    catch(err)
    {
        res.status(400).json({message : err.message});
    }
};
exports.Addexam = async (req,res) =>
{
    const{date,subject,chapter,std,mark} = req.body;
    try{
        const exam = new Exam({date, subject, chapter, std, mark})
        await exam.save();
        res.status(201).json({message :"Exam Created"});
    }
    catch(err)
    {
        res.status(400).json({message :err.message});
    }
};
exports.Getexam = async(req,res) =>
{
    const exams =await Exam.find({std:req.body.std})
    if(exams.length === 0)
    {
        res.status(404).json({message:"No Students"});
    }
    else
    {
        res.status(200).json({exams});
    }
}
exports.deleteStudent = async (req,res) => {
    const { id } = req.params;
    try {
        await Student.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            msg: 'Student deleted successfully.'
        })
    } catch(error){
        return res.status(400).send({
            success: false,
            msg: error.message
        })
    }
}
exports.editStudent = async (req,res) => {
    const { id } = req.params;
    const { name, fatherNo, motherNo, selfNo, standard, fees } = req.body;
    try {
        await Student.findByIdAndUpdate(id, {
            name, fatherNo, motherNo, selfNo, standard, fees
        })
        return res.status(200).send({
            success: true,
            msg: 'Student updated successfully.'
        })
    } catch(error){
        return res.status(400).send({
            success: false,
            msg: error.message
        })
    }
}


