const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


// express app
const app = express();

// register view engine
app.set('view engine' , 'ejs');

// connect to mongodb

const dbURL = 'mongodb+srv://mahdi:MInKJKrms3NU5ywn@cluster0.zj67veu.mongodb.net/cluster0?retryWrites=true&w=majority'

mongoose.connect(dbURL)
    .then((result) => {
        // console.log('connected');
        app.listen(3000)
    })
    .catch((err) => 
        console.log(err)
    );


app.use(express.static('public'))

app.use(express.urlencoded({extended : true}))

app.use(morgan('tiny'))


app.get('/' , (req , res) => {
    res.redirect('/blogs')
})

app.use('/blogs' , blogRoutes)

app.get('/about' , (req , res) => {
    res.render('about' , {title : 'About'})
})
//404 page

app.use((req , res) => {
    res.status(404).render('404' , {title : '404'})
})