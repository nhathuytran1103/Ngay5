const express=require('express');
const router=express.Router();
const db=require('../configs/connect');

router.get('/',function(req,res){
    db.getPosts(function(err,results){
        if(err){
             res.render('pages/error',{
                 code:results.code,
                 message:err
             });
             return;
        }
         res.render('pages/home',{
             posts:results
         });
    });
});


module.exports=router;