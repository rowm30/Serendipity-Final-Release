const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { technojamMembers } = require('../models/technojam.model')

router.get('/' , (req,res) => {
    technojamMembers.find((err,docs)=>{
        if(!err){res.send(docs);}
        else { console.log('Error in Retriving Members: ' + JSON.stringify(err, undefined, 2));}
    });
})

router.get('/:id', (req,res)=>{
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id:  ${req.params.id}`)
    }

    technojamMembers.findById(req.params.id, (err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in retriving employee:' + JSON.stringify(err, undefined, 2));}
    });
})


router.post('/', (req, res)=>{
    var mem = new technojamMembers({
        name: req.body.name,
        batch: req.body.batch,
        role: req.body.role,
        votes: req.body.votes
    });
    mem.save((err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Employee save: ' + JSON.stringify(err,undefined,2));}
    })
})

router.put('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id:  ${req.params.id}`)
    }

    var mem = {
        name: req.body.name,
        batch: req.body.batch,
        role: req.body.role,
        votes: req.body.votes
    }

    technojamMembers.findByIdAndUpdate(req.params.id, {$set:emp},{new: true},(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in employee update: ' + JSON.stringify(err,undefined,2));}
    })

})

router.delete('/:id', (req,res)=>{
    if(!err){res.send(doc);}
    else{console.log('Error in employee delete: ' + JSON.stringify(err,undefined,2));}
})


module.exports = router;