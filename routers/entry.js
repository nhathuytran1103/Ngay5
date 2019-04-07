const express=require('express');
const router=express.Router();
const db=require('../configs/connect');

router.get('/:pid',function(req,res){
    db.getEntry(req.params.pid,function(err,results){
        if(err){
             res.render('pages/error',{
                 code:results.code,
                 message:results.message
             });
             return;
        }
         res.render('pages/entry',{
             id:req.params.pid,
             posts:results
         });
    });
});


module.exports=router;