const express=require('express'),
    fs=require('fs'),
    app=express();

    const PORT = process.env.PORT || 5000;
    app.use(express.static(__dirname+'/public'));

    app.set('views',__dirname+'/views');
    app.set('view engine','ejs');

    app.use('/', require('./routers/home.js'));

    fs.readdirSync('./routers').forEach(function(file){
        const api='/'+file.substr(0,file.lastIndexOf('.'));
        const url=require('./routers/'+file);
        app.use(api,url);
    });

    app.listen(PORT,()=>{
        console.log('Node app is running on port',PORT);
    });
