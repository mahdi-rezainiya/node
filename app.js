const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine' , 'ejs');
// app.set('views' , 'mahdi');

// listen for request
app.listen(3000)

app.get('/' , (req , res) => {
    // res.sendFile('./views/index.html' , {root : __dirname})
    res.render('index' , {title : 'Home'})
})

app.get('/about' , (req , res) => {
    // res.sendFile('./views/about.html' , {root : __dirname})
    res.render('about' , {title : 'About'})
})

app.get('/blogs/create' , (req , res) => {
    res.render('create' , {title : 'Create a New Blog'})
})

// redirect

// app.get('/about-us' , (req , res) => {
//     res.redirect('/about')
// })

//404 page

app.use((req , res) => {
    // res.sendFile('./views/404.html' , {root : __dirname})
    res.status(404).render('404' , {title : '404'})
})