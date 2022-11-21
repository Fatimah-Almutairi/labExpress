import express from 'express';
import {z} from "zod";
import { Schema } from "zod";
import validate from "../middleware/validate";
import {Student, SchemaType} from "../zod-schema/student-schema";

const rout = express.Router();

let students: SchemaType[] = [];

rout.get('/', (req, res) => {
    return res.status(200).json(students);
});

rout.post('/', validate(Student), (req, res) => {
    const std = req.body as SchemaType;
    students.push(std);
    return res.status(201).json({message: "Student Addded."});
});

rout.put('/:id', validate(Student), (req,res) =>{
    const updateStudent = req.body as SchemaType;
    const { id } = req.params;
    const updated = students.filter( (std) => {
        return std.id !== id;
    });
    updated.push(updateStudent);
    students = updated;
    return res.status(201).json({
        message: "Student Updated"
    });
});

rout.delete('/:id', (req, res) =>{
    const { id } = req.params;
    const deleted = students.filter( (std) =>{
        return std.id !== id;
    });
    students = deleted;
    return res.status(201).json({
        message: "Student Deleted"
    });
});

rout.get('/search/:id', (req, res) => {
    const {id} = req.params;
    const search = students.filter( (std) => {
        if (std.major === id  ){
            return std;
        }
    });
    return res.json(search);
});

// rout.put('/:level', (req, res) => {
//     let changeLevel = req.body as SchemaType;
//     const  level  = req.params;
//     const changed = students.map ( (std) => {
//         std.level = std.level + 1;
//     });
//     changed.push(changeLevel);
//     students = changed;
//     return res.status(201).json({message: "Students Updated"
// });
// });

rout.get('/level/:id', (req, res) => {
    const {id} = req.params;
    let flag = false;
    for (let i=0; i<students.length; i++){
        if (students[i].id === id && students[i].level < 8){
            let nextLevel = students[i].level +1;
            students[i].level = nextLevel;
            flag = true;
        }
    }
    if(!flag){
        return res.status(404).json({
            message: 'No student found'
        });
    } else {
        return res.status(200).json({
            message: 'Student moved to the next level'
        });
    }
})
export default rout;