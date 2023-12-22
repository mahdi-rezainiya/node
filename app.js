const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

// declare express app
const app = express();

// register view engine to ejs
app.set('view engine' , 'ejs');

// this is URL for database
const dbURL = 'mongodb+srv://mahdi:MInKJKrms3NU5ywn@cluster0.zj67veu.mongodb.net/cluster0?retryWrites=true&w=majority'

// for connect to dbURL
mongoose.connect(dbURL)
    .then((result) => {
        app.listen(3000)
    })
    .catch((err) => 
        console.log(err)
    );

// for being public in style.css
app.use(express.static('public'))

// for convert to object mode
app.use(express.urlencoded({extended : true}))

// just for redirect
app.get('/' , (req , res) => {
    res.redirect('/blogs')
})

// blogs routes
app.use('/blogs' , blogRoutes)

// just about route
app.get('/about' , (req , res) => {
    res.render('about' , {title : 'About'})
})

//404 page
app.use((req , res) => {
    res.status(404).render('404' , {title : '404'})
})