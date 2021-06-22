'use strict';

const firebase = require('../db');
//const Student = require('../models/student');
const Class = require('../models/class');
const { getShopname } = require("../components/crawl2");
//const firestore = firebase.firestore();
const database = firebase.database();


/*
const addClass = async(req, res, next) => {
    
}*/

async function handleAsync(shop) {
    const text = await getShopname(shop);
   // console.log(sum);
    return text;
  }

const getClass = async(req, res, next) => {
    try{
        //
        const shop = req.params.shop;
       
        const text = await handleAsync(shop);
        
        console.log(text);

        
        res.send({
            
            class:text
        
        });

        
        /*
        await firebase().ref(`/users/${uid}`)
        .set({email: email, password: password, name: name, tel: tel});
        */

    }catch(error){
        res.status(400).send(error.message)

    }
   

    


}


/*
const addStudent = async(req, res, next) => {
    try{
        const data = req.body;
        await firestore.collection('students').doc().set(data);
        res.send('Record saved successfully');

    }catch(error){
        res.status(400).send(error.message)
    }

}

const getAllStudents = async (req, res, next) => {
    try{
        const students = await firestore.collection('students');
        const data = await students.get();
        const studentsArray = [];
        if(data.empty){
            res.status(404).send('No Student record found');
        }else{
            data.forEach(doc => {
                const student = new Student(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().fatherName,
                    doc.data().class,
                    doc.data().age,
                    doc.data().phoneNumber,
                    doc.data().subject,
                    doc.data().year,
                    doc.data().semester,
                    doc.data().status
                );

                studentsArray.push(student);
            });
            res.send(studentsArray);
        }
    }catch(error){
        res.status(400).send(error.message);

    }
}

const getStudent = async(req, res, next) => {
    try{
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if(!data.exists){
            res.status(404).send('Student with the given ID not found');
        }else{
            res.send(data.data());
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const updateStudent = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const student = await firestore.collection('students').doc(id);
        await student.update(data);
        res.send('Student record updated successfully');
    }catch(error){
        res.status(400).send(error.message);
    }
}

const deleteStudent = async(req, res, next) => {
    try{
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send('Record deleted successfully');
    }catch(error){
        res.status(400).send(error.message);
    }
}

*/

module.exports = {
    getClass
}