const mysql=require('mysql');
let pool;
const dev=true;

if (dev){
    pool=mysql.createPool({
        host:'localhost',
        port:'3307',
        user:'root',
        password:'usbw',
        database:'mini-lab'
    });
} else{
    pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
}

const message={
    query_null:{
        "code":500,
        "message":"Something went wrong."
    }
};


exports.getPosts=function(callback){
const sql="select post.PID, post.PTITLE,post.PDESCRIPTION,post.PDATE from post";
pool.getConnection(function(err,connection){
    if(err){
        callback(true, message.query_null);
        return;
    }
    connection.query(sql,function(err,results){
        connection.release();
        if(err||!results){
            callback(true,message.query_null);
            return;
        }
        callback(false,results);
    });
})
};

exports.getEntry=function(pid, callback){
    const sql="select * from post where post.PID = "+pid;
    pool.getConnection(function(err,connection){
        if(err){
            callback(true,message.query_null);
            return;
        }
        connection.query(sql,function(err,results){
            connection.release();
        if(err||!results[0]){
            callback(true,message.query_null);
            return;
        }
        callback(false,results[0]);
        });
    });
};